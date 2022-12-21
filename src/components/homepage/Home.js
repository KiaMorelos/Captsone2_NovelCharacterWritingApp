import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function Home() {
  const { activeUser } = useContext(AuthContext);

  return (
    <div>
      <h1>
        Welcome to WritSandbox
        {activeUser ? `, ${activeUser.username}` : null}
      </h1>
    </div>
  );
}

export default Home;
