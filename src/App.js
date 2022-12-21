import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { WritingAPI } from "./api/writingApi";
import "./App.css";
import AuthContext from "./components/context/AuthContext";
import useSessionStorage from "./hooks/useSessionStorage";
import NavBar from "./components/navbar/NavBar";
import AppRoutes from "./routes/AppRoutes";
import Loading from "./components/loading/Loading";

function App() {
  const [token, setToken] = useSessionStorage("token");
  const [activeUser, setActiveUser] = useState(null);

  async function signup(data) {
    try {
      const res = await WritingAPI.signup(data);
      setToken(res);

      return { message: "success" };
    } catch (err) {
      return { message: "failed", err };
    }
  }

  async function login(data) {
    try {
      const res = await WritingAPI.login(data);
      setToken(res);
      return { message: "success" };
    } catch (err) {
      return { message: "failed", err };
    }
  }

  const logout = () => {
    setToken(null);
    setActiveUser(null);
  };

  useEffect(() => {
    async function getActiveUser() {
      if (token) {
        try {
          const { userId } = decodeToken(token);
          WritingAPI.authToken = token;
          const res = await WritingAPI.getUser(userId);
          setActiveUser(res);
        } catch (err) {
          setActiveUser(null);
          return { message: "unauthorized" };
        }
      }
    }
    getActiveUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ activeUser }}>
      <div className="App">
        <BrowserRouter>
          <NavBar logout={logout} />
          <AppRoutes login={login} signup={signup} />
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
