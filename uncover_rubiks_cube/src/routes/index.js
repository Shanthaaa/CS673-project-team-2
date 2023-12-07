import { Navigate } from "react-router-dom";
import Home from "../pages/Home";
import RubiksCube from "../pages/RubiksCube";
import Rules from "../pages/Rules";

export const routes = [
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/rubikscube",
    element: <RubiksCube />,
  },
  {
    path: "/rules",
    element: <Rules />,
  },
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
];
