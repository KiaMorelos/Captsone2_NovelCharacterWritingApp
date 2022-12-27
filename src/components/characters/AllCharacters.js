import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { WritingAPI } from "../../api/writingApi";
import Loading from "../loading/Loading";
import CharacterListItem from "./CharacterListItem";

function AllCharacters() {
  const [characters, setCharacters] = useState(null);

  async function deleteCharacter(id) {
    const response = await WritingAPI.deleteCharacter(id);
    setCharacters(response);
  }

  useEffect(() => {
    async function getCharacters() {
      const response = await WritingAPI.getAllCharacters();
      setCharacters(response);
    }
    getCharacters();
  }, []);

  if (!characters) return <Loading />;

  return (
    <Container style={{ padding: "5%" }}>
      <Row>
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
          <p>You haven't created any characters yet</p>
        )}
      </Row>
    </Container>
  );
}

export default AllCharacters;
