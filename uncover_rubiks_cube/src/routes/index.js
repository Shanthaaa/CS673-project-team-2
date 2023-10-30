import { Navigate } from "react-router-dom"
import Home from "../pages/Home"
import RubiksCube from "../pages/RubiksCube"

export const routes = [
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/rubikscube',
    element: <RubiksCube />
  },
  {
    path: '/',
    element: <Navigate to="/home" />
  }
]