import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { activeUser } = useContext(AuthContext);
  const hasToken = sessionStorage.getItem("token");
  return activeUser || hasToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
