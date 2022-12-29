import AuthContext from "./components/context/AuthContext";

const testUser = {
  username: "testuser",
  email: "test@test.com",
};

const AuthContextProvider = ({ children, activeUser = testUser }) => (
  <AuthContext.Provider value={{ activeUser }}>{children}</AuthContext.Provider>
);

export default AuthContextProvider;
