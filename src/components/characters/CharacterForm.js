import { useState } from "react";
import { WritingAPI } from "../../api/writingApi";
import { generateName } from "../../api/namesApi";
import Loading from "../loading/Loading";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function CharacterForm({
  whichAction,
  characterId,
  patchCharacter,
  editStatus,
}) {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    generateName: "none",
    name: "",
    characterPhotoUrl: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    console.log(formData);
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      if (formData.generateName === "male") {
        const res = await generateName("boy");
        formData.name = res;
      }
      if (formData.generateName === "female") {
        const res = await generateName("girl");
        formData.name = res;
      }
      if (formData.generateName === "neutral") {
        const res = await generateName("neutral");
        formData.name = res;
      }
      if (
        formData.generateName === "any" ||
        (formData.generateName === "none" && !formData.name)
      ) {
        const res = await generateName();
        formData.name = res;
      }

      setLoading(true);

      if (whichAction === "new") {
        const res = await WritingAPI.newCharacter({
          name: formData.name,
          characterPhotoUrl: formData.characterPhotoUrl,
        });
        setCharacter(res);
      } else {
        patchCharacter(characterId, formData);
      }

      setLoading(false);
      setFormData({
        name: "",
        characterPhotoUrl: "",
        generateName: formData.generateName,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>{whichAction === "new" ? "New" : "Edit"} Character</h1>
      <p>
        Don't know what to name your character yet? Use the select menu and pick
        the type of name you need and leave the name field blank. A random name
        will be generated for you. If you select 'I have a name I want to use'
        but leave the name field blank a random name will still be generated.
        You can always change the character's name later.
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
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Type of Name to Generate if Desired:</Form.Label>
          <Form.Select
            aria-label="Type of name to generate"
            name="generateName"
            onChange={handleChange}
          >
            <option value="none">I have a name I want to use</option>
            <option value="male">Generate Random Male Name</option>
            <option value="female">Generate Random Female Name</option>
            <option value="neutral">Generate Random Gender Neutral Name</option>
            <option value="any">Suprise me</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label>Character's Full Name</Form.Label>
          <Form.Control
            placeholder="Character's Full Name"
            onChange={handleChange}
            type="text"
            name="name"
            value={formData.name}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Character Photo URL</Form.Label>
          <Form.Control
            placeholder="https://imgr.com/img"
            onChange={handleChange}
            type="text"
            name="characterPhotoUrl"
            value={formData.characterPhotoUrl}
          />
        </Form.Group>
        {whichAction === "new" ? (
          <Button type="submit">Create Character</Button>
        ) : (
          <>
            <Button onClick={() => editStatus(false)}>Cancel edit</Button>
            <Button type="submit">Save Edit</Button>
          </>
        )}
      </Form>
    </div>
  );
}

export default CharacterForm;
