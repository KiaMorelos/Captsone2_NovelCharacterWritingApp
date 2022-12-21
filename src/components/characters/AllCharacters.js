import { useEffect, useState } from "react";

import { WritingAPI } from "../../api/writingApi";
import Loading from "../loading/Loading";
import CharacterListItem from "./CharacterListItem";

function AllCharacters() {
  const [characters, setCharacters] = useState(null);

  useEffect(() => {
    async function getCharacters() {
      const response = await WritingAPI.getAllCharacters();
      setCharacters(response);
    }
    getCharacters();
  }, []);

  if (!characters) return <Loading />;

  return (
    <ul>
      {characters.length ? (
        characters.map((c) => (
          <CharacterListItem
            key={c.id}
            id={c.id}
            name={c.name}
            characterPhotoUrl={c.characterPhotoUrl}
          />
        ))
      ) : (
        <li>You haven't created any characters yet</li>
      )}
    </ul>
  );
}

export default AllCharacters;