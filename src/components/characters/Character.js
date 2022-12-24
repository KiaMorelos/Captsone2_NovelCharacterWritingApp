import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { WritingAPI } from "../../api/writingApi";
import AllAnswers from "../answers/AllAnswers";
import Loading from "../loading/Loading";
import CharacterForm from "./CharacterForm";

function Character() {
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [editing, setEditing] = useState(false);
  const { id } = useParams();

  async function deleteCharacter(id) {
    await WritingAPI.deleteCharacter(id);
    navigate("/characters");
  }

  async function patchC(id, data) {
    const res = await WritingAPI.patchCharacter(id, data);
    setCharacter({
      ...character,
      name: res.name,
      characterPhotoUrl: res.characterPhotoUrl,
    });
    setEditing(false);
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
          patchCharacter={patchC}
          editStatus={setEditing}
        />
      ) : null}
      {Answers.length ? (
        <AllAnswers Answers={Answers} />
      ) : (
        <p>
          You haven't added any questionaire answers for this character yet.
          <Link
            to="/questionaires-questions"
            state={{ from: name, characterId: id }}
          >
            Search questions and add answers
          </Link>
        </p>
      )}
    </div>
  );
}

export default Character;
