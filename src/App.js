import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { WritingAPI } from "./api/writingApi";
import "./App.css";
import AuthContext from "./components/context/AuthContext";
import useLocalStorage from "./hooks/useLocalStorage";
import Menu from "./components/navbar/Menu";
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

      return { status: "success" };
    } catch (err) {
      return { status: "failed", err };
    }
  }

  async function login(data) {
    try {
      const res = await WritingAPI.login(data);
      setToken(res);
      return { status: "success" };
    } catch (err) {
      return { status: "failed", err };
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
          setLoading(false);
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
          <Menu logout={logout} />
          <AppRoutes login={login} signup={signup} />
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
