import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { WritingAPI } from "../../api/writingApi";
import AllAnswers from "../answers/AllAnswers";
import Loading from "../loading/Loading";

function Character() {
  const [character, setCharacter] = useState(null);
  const { id } = useParams();

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
          src={`https://robohash.org/${id}.png?set=set5&size=100x100`}
          alt=""
        />
      )}
      <h1>{name}</h1>
      <AllAnswers Answers={Answers} />
    </div>
  );
}

export default Character;
