function CharacterListItem({ id, name, characterPhotoUrl }) {
  return (
    <li id={id} key={id}>
      <a href={`characters/${id}`}>
        {characterPhotoUrl ? (
          <img src={characterPhotoUrl} alt="" />
        ) : (
          <img
            src={`https://robohash.org/${id}.png?set=set5&size=100x100`}
            alt=""
          />
        )}
        {name}
      </a>
    </li>
  );
}

export default CharacterListItem;
