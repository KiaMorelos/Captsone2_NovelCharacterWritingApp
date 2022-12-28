import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGhost, faPlus } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { WritingAPI } from "../../api/writingApi";
import Loading from "../loading/Loading";
import CharacterListItem from "./CharacterListItem";
import Button from "react-bootstrap/Button";

function AllCharacters() {
  const [characters, setCharacters] = useState(null);
  const { activeUser } = useContext(AuthContext);
  const navigate = useNavigate();
  async function deleteCharacter(id) {
    const response = await WritingAPI.deleteCharacter(id);
    setCharacters(response);
  }

  useEffect(() => {
    async function getCharacters() {
      if (!activeUser) return;
      const response = await WritingAPI.getAllCharacters();
      setCharacters(response);
    }
    getCharacters();
  }, [activeUser]);

  if (!activeUser || !characters) return <Loading />;

  return (
    <Container className="pt-5">
      <h1 className="text-center m-auto">My Characters</h1>
      <Row style={{ margin: "auto" }}>
        {characters.length ? (
          characters.map((c) => (
            <Col key={c.id}>
              <CharacterListItem
                key={c.id}
                id={c.id}
                name={c.name}
                characterPhotoUrl={c.characterPhotoUrl}
                deleteCharacter={deleteCharacter}
              />
            </Col>
          ))
        ) : (
          <div>
            <h2 className="m-5">
              <FontAwesomeIcon icon={faGhost} /> You haven't created any
              characters yet, or you already killed them all.
            </h2>
            <Button onClick={() => navigate("/new-character")}>
              <FontAwesomeIcon icon={faPlus} /> Create New Character
            </Button>
          </div>
        )}
      </Row>
    </Container>
  );
}

export default AllCharacters;
