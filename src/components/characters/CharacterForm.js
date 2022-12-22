import { useState } from "react";
import { WritingAPI } from "../../api/writingApi";
import { generateName } from "../../api/namesApi";
import Loading from "../loading/Loading";

function CharacterForm({ whichAction, characterId, patchCharacter }) {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    characterPhotoUrl: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      if (formData.name === "m") {
        const res = await generateName("boy");
        formData.name = res;
      }
      if (formData.name === "f") {
        const res = await generateName("girl");
        formData.name = res;
      }
      if (formData.name === "n") {
        const res = await generateName("neutral");
        formData.name = res;
      }
      if (!formData.name) {
        const res = await generateName();
        formData.name = res;
      }

      setLoading(true);

      if (whichAction === "new") {
        const res = await WritingAPI.newCharacter(formData);
        setCharacter(res);
      } else {
        const res = await patchCharacter(characterId, formData);
        setCharacter(res);
      }

      setLoading(false);
      setFormData({
        name: "",
        characterPhotoUrl: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>{whichAction === "new" ? "New" : "Edit"} Character</h1>
      <p>
        Don't know what to name your character? In the name field, type 'm' for
        male name, 'f' for a female name, 'n' for a gender neutral name, or
        leave blank and a random name will be generated for you.
      </p>
      {loading ? <Loading /> : null}
      {character ? (
        <p>
          Successfuly created character:
          <a href={`characters/${character.id}`}>{character.name}</a>. You can
          keep adding characters by submitting the form, or go straight to
          viewing, <a href={`characters/${character.id}`}>{character.name}</a>
        </p>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Character Name</label>
          <input
            placeholder="name"
            onChange={handleChange}
            type="text"
            name="name"
            value={formData.name}
          />
        </div>
        <div>
          <label>Character Photo URL</label>
          <input
            placeholder="https://imgr.com/img"
            onChange={handleChange}
            type="text"
            name="characterPhotoUrl"
            value={formData.characterPhotoUrl}
          />
        </div>
        {whichAction === "new" ? (
          <button>Create Character</button>
        ) : (
          <button>Save Edit</button>
        )}
      </form>
    </div>
  );
}

export default CharacterForm;
