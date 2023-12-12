import React, { useEffect, useState } from "react";
import "./index.css";
import { Popover } from "antd";
import { mapIndexToColor } from "../../../../../../utils/common/color";

enum SquareColor {
  Red = "#ff0000",
  Blue = "#0000ff",
  Green = "#00ff00",
  Yellow = "#ffff00",
  Purple = "#ff00ff",
  Cyan = "#00ffff",
}

const { Red, Blue, Green, Yellow, Purple, Cyan } = SquareColor;

//three rows for one side
const row1 = [0, 1, 2];
const row2 = [3, 4, 5];
const row3 = [6, 7, 8];

const colorSet = [
  { color: "red", value: Red },
  { color: "blue", value: Blue },
  { color: "green", value: Green },
  { color: "yellow", value: Yellow },
  { color: "purple", value: Purple },
  { color: "cyan", value: Cyan },
];

type Side = "U" | "R" | "F" | "D" | "L" | "B";

const OneSide: React.FC<{
  side: Side;
  finishedColors: SquareColor[] | undefined;
  setSideColorData: (side: Side, colors: string[]) => void;
}> = ({ side, finishedColors, setSideColorData }) => {
  const [square, setSquare] = useState<number>(0);
  const [colorData, setColorData] = useState<string[]>([
    "#ccc",
    "#ccc",
    "#ccc",
    "#ccc",
    mapIndexToColor(side),
    "#ccc",
    "#ccc",
    "#ccc",
    "#ccc",
  ]);

  //set color to one square
  const setSquareColor = (color: SquareColor) => {
    colorData[square] = color;
    setSideColorData(side, colorData);
    setColorData([...colorData]);
  };

  useEffect(() => {
    //when component is mounted
    //set initial color data to specific side
    setSideColorData(side, colorData);
    console.log(side, "setSideColorData");
  }, []);

  //color picker
  //show colors that have been set less than nine times
  const colorPanel = (
    <div className="color-panel">
      {colorSet.map((item, index) => {
        return finishedColors?.includes(item.value) ? null : (
          <div
            key={index}
            className={`small-square ${item.color}`}
            onClick={() => setSquareColor(item.value)}
          ></div>
        );
      })}
    </div>
  );

  //square wrapped by color picker
  const squareWithColorPicker = (v: number) => {
    return (
      <Popover
        content={colorPanel}
        title="Choose Your Color"
        trigger="click"
        key={v}
      >
        <div
          style={{ backgroundColor: colorData[v] }}
          className="square"
          onClick={() => setSquare(v)}
        ></div>
      </Popover>
    );
  };

  //square isn't wrapped by color picker
  const squareWithoutColorPicker = (
    <div
      key={"center-square"}
      style={{ backgroundColor: mapIndexToColor(side) }}
      className="center-square"
    ></div>
  );

  return (
    <div className="container">
      <div className="square-row">
        {row1.map((v) => {
          return squareWithColorPicker(v);
        })}
      </div>
      <div className="square-row">
        {row2.map((v) => {
          return v === 4 ? squareWithoutColorPicker : squareWithColorPicker(v);
        })}
      </div>
      <div className="square-row">
        {row3.map((v) => {
          return squareWithColorPicker(v);
        })}
      </div>
    </div>
  );
};

export default OneSide;
