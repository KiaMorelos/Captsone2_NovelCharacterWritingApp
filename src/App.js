import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { WritingAPI } from "./api/writingApi";
import "./App.css";
import AuthContext from "./components/context/AuthContext";
import useLocalStorage from "./hooks/useLocalStorage";
import NavBar from "./components/navbar/NavBar";
import AppRoutes from "./routes/AppRoutes";
import Loading from "./components/loading/Loading";

function App() {
  const [token, setToken] = useLocalStorage("token");
  const [activeUser, setActiveUser] = useState(null);
  const [loading, setLoading] = useState(false);

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
          setLoading(true);
          const { userId } = decodeToken(token);
          WritingAPI.authToken = token;
          const res = await WritingAPI.getUser(userId);
          setActiveUser({ userId, ...res });
          setLoading(false);
        } catch (err) {
          setActiveUser(null);
          return { message: "unauthorized" };
        }
      }
    }
    getActiveUser();
  }, [token]);
  if (loading) return <Loading />;
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
