import path from "path";
import MainPage from "../Components/Pages/MainPage/MainPage";
import Login from "../Components/LogIn/login";
import { Navigate } from "react-router-dom";
export default [
  {
    path: "/user",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Navigate to="/login" />,
  },
];
