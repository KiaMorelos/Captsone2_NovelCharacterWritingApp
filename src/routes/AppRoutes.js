import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "../components/protectedRoutes/ProtectedRoutes";
import Home from "../components/homepage/Home";
import LoginForm from "../components/login/LoginForm";
import SignUpForm from "../components/signup/SignUpForm";
import AllCharacters from "../components/characters/AllCharacters";
import Character from "../components/characters/Character";
import ProfileForm from "../components/profile/ProfileForm";
import CharacterForm from "../components/characters/CharacterForm";
import AllQuestionaires from "../components/questionaires/AllQuestionaires";
import AllQuestions from "../components/questions/AllQuestions";

function AppRoutes({ login, signup }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/questionaires" element={<AllQuestionaires />}></Route>
        <Route path="/questions" element={<AllQuestions />}></Route>
        <Route path="/characters" element={<AllCharacters />} />
        <Route path="/characters/:id" element={<Character />} />
        <Route
          path="/new-character"
          element={<CharacterForm whichAction={"new"} />}
        />

        <Route path="/profile" element={<ProfileForm />} />
      </Route>
      <Route path="login" element={<LoginForm login={login} />} />
      <Route path="signup" element={<SignUpForm signup={signup} />} />
    </Routes>
  );
}

export default AppRoutes;
