function CharacterListItem({ id, name, characterPhotoUrl, deleteCharacter }) {
  return (
    <li id={id} key={id}>
      <a href={`characters/${id}`}>
        {characterPhotoUrl ? (
          <img src={characterPhotoUrl} alt="" />
        ) : (
          <img
            src={`https://avatars.dicebear.com/api/bottts/${id}.svg?size=100`}
            alt=""
          />
        )}
        {name}
      </a>
      <button onClick={() => deleteCharacter(id)}>Delete</button>
    </li>
  );
}

export default CharacterListItem;
