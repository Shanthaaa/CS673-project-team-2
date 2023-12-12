import { Button, ColorPicker, Modal, Popover, message } from "antd";
import React, { useEffect, useState } from "react";
import OneSide from "./components/OneSide";
import "./index.css";
import { mapIndexToColor } from "../../../../utils/common/color";
import { getHintAPI } from "../../../../services/RubiksCube";
import { QuestionOutlined } from "@ant-design/icons";

enum SquareColor {
  Red = "#ff0000",
  Blue = "#0000ff",
  Green = "#00ff00",
  Yellow = "#ffff00",
  Purple = "#ff00ff",
  Cyan = "#00ffff",
}

const { Red, Blue, Green, Yellow, Purple, Cyan } = SquareColor;

type Side = "U" | "R" | "F" | "D" | "L" | "B";
type CubeColorData = {
  U: string;
  R: string;
  F: string;
  D: string;
  L: string;
  B: string;
};

const CustomizeCube: React.FC<{
  className: string;
  setCustomData: (cubeStatus: string) => void;
}> = ({ className, setCustomData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [finishedColors, setFinishedColors] = useState<SquareColor[]>();
  const [cubeColorData, setCubeColorData] = useState<CubeColorData>({
    U: "",
    R: "",
    F: "",
    D: "",
    L: "",
    B: "",
  });

  const [messageApi, contextHolder] = message.useMessage();

  const mapColorToIndex = (char: string) => {
    switch (char) {
      case Purple:
        return "U";
      case Cyan:
        return "R";
      case Yellow:
        return "F";
      case Blue:
        return "D";
      case Red:
        return "L";
      case Green:
        return "B";
      default:
        return "";
    }
  };

  //set color to one side
  const setSideColorData = (side: Side, colors: string[]) => {
    //collect color data for specific side
    let sideColorData = "";
    for (let i = 0; i < colors.length; i++) {
      sideColorData += mapColorToIndex(colors[i]);
    }
    //set color data for specific side
    cubeColorData[side] = sideColorData;
    setCubeColorData({ ...cubeColorData });
    console.log("cubeColorData", cubeColorData);
    //get the colors that have been set nine times
    const finishedColors = getFinishedColors(cubeColorData);
    setFinishedColors(finishedColors);
    console.log("finishedColors", finishedColors);
  };

  //get the colors that have been set nine times
  const getFinishedColors = (cubeColorData: CubeColorData) => {
    const cubeColorSum = { U: 0, R: 0, F: 0, D: 0, L: 0, B: 0 };
    const finishedColor = [];
    //calculate the times that every color has been set
    for (let key in cubeColorData) {
      let sideColor = cubeColorData[key as Side];
      for (let i = 0; i < sideColor.length; i++) {
        let color = sideColor[i];
        cubeColorSum[color as Side]++;
      }
    }
    //collect the colors that have been set nine times
    for (let key in cubeColorSum) {
      if (cubeColorSum[key as Side] === 9) {
        finishedColor.push(mapIndexToColor(key));
      }
    }
    console.log("U", cubeColorSum.U);
    return finishedColor;
  };

  const questionContent = (
    <div>
      <div>Click one block of the cube.</div>
      <div>Choose one color from the color board.</div>
      <div>Check the number of colors.</div>
      <div>Check whether the cube is solvable or not.</div>
    </div>
  );

  //show the color setting modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  //finish color setting
  const handleOk = async () => {
    //collect state data for Rubik's Cube
    const cubeStatus =
      cubeColorData.U +
      cubeColorData.R +
      cubeColorData.F +
      cubeColorData.D +
      cubeColorData.L +
      cubeColorData.B;
    //check whether the Rubik's Cube is valid
    const res = await getHintAPI(cubeStatus).catch((reason) => {
      console.log("reason", reason);
      //if Rubik's Cube is invalid, show message
      messageApi.open({
        type: "error",
        content: "Invalid Rubik's Cube",
      });
    });
    console.log("res", res);
    if (res) {
      //if Rubik's Cube is valid, generate such Rubik's Cube
      setCustomData(cubeStatus);
      //close color setting modal
      setIsModalOpen(false);
      setCubeColorData({
        U: "",
        R: "",
        F: "",
        D: "",
        L: "",
        B: "",
      });
      setFinishedColors([]);
    }
  };

  //cancel setting color
  const handleCancel = () => {
    setCubeColorData({
      U: "",
      R: "",
      F: "",
      D: "",
      L: "",
      B: "",
    });
    setFinishedColors([]);
    setIsModalOpen(false);
  };
  return (
    <>
      {contextHolder}
      <Modal
        title="Input Color to Customize Your Rubik's Cube"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose
      >
        <Popover
          content={questionContent}
          title="Steps to input your cube:"
          trigger="focus"
        >
          <Button
            className="question-button"
            type="primary"
            shape="circle"
            icon={<QuestionOutlined />}
          ></Button>
        </Popover>
        <div className="cube-container">
          <div>
            <OneSide
              side={"L"}
              finishedColors={finishedColors}
              setSideColorData={setSideColorData}
            />
          </div>
          <div>
            <OneSide
              side={"U"}
              finishedColors={finishedColors}
              setSideColorData={setSideColorData}
            />
            <OneSide
              side={"F"}
              finishedColors={finishedColors}
              setSideColorData={setSideColorData}
            />
            <OneSide
              side={"D"}
              finishedColors={finishedColors}
              setSideColorData={setSideColorData}
            />
          </div>
          <div>
            <OneSide
              side={"R"}
              finishedColors={finishedColors}
              setSideColorData={setSideColorData}
            />
          </div>
          <div>
            <OneSide
              side={"B"}
              finishedColors={finishedColors}
              setSideColorData={setSideColorData}
            />
          </div>
        </div>
      </Modal>
      <Button type="primary" className={className} onClick={showModal}>
        Customize Yours
      </Button>
    </>
  );
};

export default CustomizeCube;
