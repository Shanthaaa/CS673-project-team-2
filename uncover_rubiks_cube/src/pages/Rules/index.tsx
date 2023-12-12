import React from "react";
import "./index.css";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Rules() {

  //use useNavigate to back home
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/home");
  };

  return (
    <div>
      {/* click button to go back home */}
      <Button
        type="primary"
        icon={<ArrowLeftOutlined />}
        onClick={backHome}
      ></Button>
      {/* rules and regulations for Rubik's Cube */}
      <div className="rules-container">
        <div className="rules-title">How to play</div>
        <div className="rules-content">
          Step 1: Move the Rubik's Cube and select a cube of it
        </div>
        <div className="rules-content">
          Step 2: Click up, down, left, right, clockwise or counterclockwise
          button to rotate
        </div>
        <div className="rules-title">Goal</div>
        <div className="rules-content">
          Align all faces of the Rubik's Cube so that each face of the Rubik's
          Cube has only one color
        </div>
        <div className="rules-title">Permissible Moves</div>
        <div className="rules-content">Any rotation of any face is allowed</div>
      </div>
    </div>
  );
}
