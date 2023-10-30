import React from "react";
import RubiksCube from "./pages/RubiksCube";
import { routes } from "./routes";
import { useRoutes } from "react-router-dom";

function App() {
  const element = useRoutes(routes);
  return (
    <div>
      {element}
    </div>
  );
}

export default App;
