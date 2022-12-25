import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { faTrash, faPencil, faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { WritingAPI } from "../../api/writingApi";
import AllAnswers from "../answers/AllAnswers";
import Loading from "../loading/Loading";
import CharacterForm from "./CharacterForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Character() {
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

  async function deleteAns(characterId, answerId) {
    await WritingAPI.deleteAnswer(characterId, answerId);
    const result = character.Answers.filter((answer) => answer.id !== answerId);
    setCharacter({ ...character, Answers: result });
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
    async function getCharacter() {
      const response = await WritingAPI.getCharacter(id);
      setCharacter(response);
    }
    getCharacter();
  }, [id]);

  if (!character) return <Loading />;
  const { name, characterPhotoUrl, Answers } = character;
  return (
    <div>
      {characterPhotoUrl ? (
        <img src={characterPhotoUrl} alt="" />
      ) : (
        <img
          src={`https://avatars.dicebear.com/api/bottts/${id}.svg?size=150`}
          alt=""
          style={{ margin: "0 auto", padding: "5% 0 0 0" }}
        />
      )}
      <h1
        className="text-center"
        style={{ margin: "0 auto", padding: "0 0 2% 0" }}
      >
        {name}
      </h1>
      {Answers.length ? (
        <div style={{ margin: "0 auto", padding: "0 0 2% 0" }}>
          <Link
            to="/questionaires-questions"
            state={{ from: name, characterId: id }}
          >
            <FontAwesomeIcon icon={faPlus} /> Search for more questions to add
            to this character's profile
          </Link>
        </div>
      ) : null}
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
      {Answers.length ? (
        <div>
          <AllAnswers
            Answers={Answers}
            characterId={id}
            deleteAns={deleteAns}
          />
        </div>
      ) : (
        <p
          style={{
            margin: "0 auto",
            padding: "0 5% 2% 5%",
            textAlign: "center",
          }}
        >
          You haven't added any questionaire answers for this character yet.
          <Link
            to="/questionaires-questions"
            state={{ from: name, characterId: id }}
          >
            <FontAwesomeIcon icon={faPlus} /> Search questions and add answers
          </Link>
        </p>
      )}
    </div>
  );
}

export default Character;
