import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencil } from "@fortawesome/free-solid-svg-icons";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./CharacterList.css";

function CharacterListItem({ id, name, characterPhotoUrl, deleteCharacter }) {
  return (
    <Card style={{ width: "18rem", margin: "5%" }} bg="dark" key={id}>
      <a href={`characters/${id}`}>
        {characterPhotoUrl ? (
          <Card.Img src={characterPhotoUrl} alt="" />
        ) : (
          <Card.Img
            src={`https://avatars.dicebear.com/api/bottts/${id}.svg?size=70`}
            alt="placeholder photo"
          />
        )}
      </a>
      <Card.Body>
        <Card.Text style={{ textAlign: "center" }}>
          <a href={`characters/${id}`}>
            <FontAwesomeIcon icon={faPencil} /> {name}
          </a>
        </Card.Text>
        <Button
          onClick={() => deleteCharacter(id)}
          variant="outline-danger btn-sm"
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CharacterListItem;
