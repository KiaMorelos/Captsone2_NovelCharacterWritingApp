import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { WritingAPI } from "../../api/writingApi";
import AllAnswers from "../answers/AllAnswers";
import Loading from "../loading/Loading";
import CharacterForm from "./CharacterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Character.css";

function Character() {
  const { activeUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [editingChar, setEditingChar] = useState(false);

  const handleCloseEditingChar = () => setEditingChar(false);
  const handleShowEditingChar = () => setEditingChar(true);
  const { id } = useParams();

  async function deleteCharacter(id) {
    await WritingAPI.deleteCharacter(id);
    navigate("/characters");
  }

  async function patchCharacter(id, data) {
    const res = await WritingAPI.patchCharacter(id, data);
    setCharacter({
      ...character,
      name: res.name,
      characterPhotoUrl: res.characterPhotoUrl,
    });
    setEditingChar(false);
  }

  useEffect(() => {
    if (!activeUser) return;
    async function getCharacter() {
      try {
        const response = await WritingAPI.getCharacter(id);
        setCharacter(response);
      } catch (err) {
        if (
          err[0] === "404 Not Found" ||
          err[0] === "This character does not exist"
        ) {
          navigate("/404");
        } else {
          navigate("/oops");
        }
      }
    }
    getCharacter();
  }, [id, navigate, activeUser]);

  if (!activeUser || !character) return <Loading />;
  const { name, characterPhotoUrl } = character;
  return (
    <div>
      {characterPhotoUrl ? (
        <div
          role="img"
          aria-label={`character photo of ${name}`}
          title={`character photo of ${name}`}
          style={{
            backgroundImage: `url(${characterPhotoUrl})`,
          }}
          className="character-photo"
        >
          <div className="contain-photo"></div>
        </div>
      ) : (
        <>
          <img
            src={`https://avatars.dicebear.com/api/bottts/${id}.svg?size=150`}
            alt="placeholder character photo of cute robot"
            className="contain-photo"
          />
        </>
      )}
      {!characterPhotoUrl ? (
        <div className="m-1">
          <small>
            <a
              href="https://avatars.dicebear.com/licenses"
              style={{ fontWeight: "300", color: "aliceblue" }}
            >
              'bottts' by Pablo Stanley via DiceBear
            </a>
          </small>
        </div>
      ) : null}
      <h1 className="text-center character-name">{name}</h1>

      <Button onClick={() => handleShowEditingChar()} className="m-3">
        <FontAwesomeIcon icon={faPencil} /> Edit Character Name / Image
      </Button>
      <Button onClick={() => deleteCharacter(id)} variant="outline-danger">
        <FontAwesomeIcon icon={faTrash} /> Delete character
      </Button>
      <Modal show={editingChar} onHide={handleCloseEditingChar}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon={faPencil} /> Editing {name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingChar ? (
            <CharacterForm
              whichAction={"edit"}
              characterId={id}
              patchCharacter={patchCharacter}
              editStatus={setEditingChar}
            />
          ) : null}
        </Modal.Body>
      </Modal>
      <div>
        <AllAnswers characterId={id} characterName={name} />
      </div>
    </div>
  );
}

export default Character;
