import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../components/protectedRoutes/ProtectedRoutes";
import Home from "../components/homepage/Home";
import LoginForm from "../components/login/LoginForm";
import SignUpForm from "../components/signup/SignUpForm";
import AllCharacters from "../components/characters/AllCharacters";
import Character from "../components/characters/Character";
import ProfileForm from "../components/profile/ProfileForm";
import NewCharacterForm from "../components/characters/NewCharacterForm";

function AppRoutes({ login, signup }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/questionaires"></Route>
        <Route path="/questions"></Route>
        <Route path="/characters" element={<AllCharacters />} />
        <Route path="/characters/:id" element={<Character />} />
        <Route path="/new-character" element={<NewCharacterForm />} />
        <Route path="/profile" element={<ProfileForm />} />
      </Route>
      <Route path="login" element={<LoginForm login={login} />} />
      <Route path="signup" element={<SignUpForm signup={signup} />} />
    </Routes>
  );
}

export default AppRoutes;
