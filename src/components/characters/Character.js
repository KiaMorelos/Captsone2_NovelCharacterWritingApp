import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { WritingAPI } from "../../api/writingApi";
import AllAnswers from "../answers/AllAnswers";
import Loading from "../loading/Loading";
import CharacterForm from "./CharacterForm";

function Character() {
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [editing, setEditing] = useState();
  const { id } = useParams();

  async function deleteCharacter(id) {
    await WritingAPI.deleteCharacter(id);
    navigate("/characters");
  }

  async function patchCharacter(id, data) {
    const res = await WritingAPI.patchCharacter(id, data);
    setCharacter(res);
    setEditing(false);
  }

  useEffect(() => {
    async function getCharacter() {
      const response = await WritingAPI.getCharacter(id);
      setCharacter(response);
    }
    getCharacter();
  }, [id, character]);

  if (!character) return <Loading />;
  const { name, characterPhotoUrl, Answers } = character;
  return (
    <div>
      {characterPhotoUrl ? (
        <img src={characterPhotoUrl} alt="" />
      ) : (
        <img
          src={`https://avatars.dicebear.com/api/bottts/${id}.svg?size=100`}
          alt=""
        />
      )}
      <h1>{name}</h1>

      <button onClick={() => setEditing(true)}>
        Edit Character Name / Image
      </button>
      <button onClick={() => deleteCharacter(id)}>Delete character</button>
      {editing ? (
        <CharacterForm
          whichAction={"edit"}
          characterId={id}
          patchCharacter={patchCharacter}
        />
      ) : null}
      {Answers.length ? (
        <AllAnswers Answers={Answers} />
      ) : (
        <p>
          You haven't added any questionaire answers for this character yet.
          Create some.
        </p>
      )}
    </div>
  );
}

export default Character;
