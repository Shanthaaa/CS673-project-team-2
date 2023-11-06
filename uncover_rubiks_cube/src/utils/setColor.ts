import { CubeChild } from "../types/common";
import { mapAxisToPositon, mapPositionToIndex } from "./common/color";

enum CubeColor {
  Black = 0x000000,
  Red = 0xff0000,
  Blue = 0x0000ff,
  Green = 0x00ff00,
  Yellow = 0xffff00,
  Purple = 0xff00ff,
  Cyan = 0x00ffff,
}

const { Black, Red, Blue, Green, Yellow, Purple, Cyan } = CubeColor;
//set color of the Rubik's Cube
export default (cubeStatus: string, children: CubeChild[]) => {
  for (let i = 0; i < children.length; i++) {
    let str = `${children[i].axis.x}, ${children[i].axis.y}, ${children[i].axis.z}`;
    const temp = mapAxisToPositon(str);
    const positions = temp?.split(" ");
    if (positions) {
      for (let j = 0; j < positions.length; j++) {
        //alphabet + digit
        const position = positions[j];
        //index of cubeStatus
        const index = mapPositionToIndex(position);
        //alphabet that represents a specific color
        const colorIndex = cubeStatus[index];
        //color that we need change to
        const color = mapIndexToColor(colorIndex);
        //get position where we need change the color
        Object.entries(children[i].positions).forEach((item) => {
          if (item[0] == position[0]) {
            const value = item[1];
            children[i].cube.material[value].setValues({ color });
          }
        });
        // if(str == "1, 1, 1"){
        //   console.log("position", position);
        //   console.log("index", index);
        //   console.log("colorIndex", colorIndex);
        //   console.log("color", color);
        // }
      }
    }
    // if(str == "1, 1, 1"){
    //   console.log("setColor", i, children[i]);
    // }
  }
};

// const mapAxisToPositon = (axis: string) => {
//   switch (axis) {
//     case "-1, -1, -1":
//       return "L7 D7 B9";
//     case "-1, -1, 0":
//       return "L8 D4";
//     case "-1, -1, 1":
//       return "L9 D1 F7";
//     case "-1, 0, -1":
//       return "L4 B6";
//     case "-1, 0, 0":
//       return "L5";
//     case "-1, 0, 1":
//       return "L6 F4";
//     case "-1, 1, -1":
//       return "L1 U1 B3";
//     case "-1, 1, 0":
//       return "L2 U4";
//     case "-1, 1, 1":
//       return "L3 U7 F1";
//     case "0, -1, -1":
//       return "D8 B8";
//     case "D5":
//       return "0, -1, 0";
//     case "0, -1, 1":
//       return "D2 F8";
//     case "0, 0, -1":
//       return "B5";
//     case "0, 0, 0":
//       return "";
//     case "0, 0, 1":
//       return "F5";
//     case "0, 1, -1":
//       return "U2 B2";
//     case "0, 1, 0":
//       return "U5";
//     case "0, 1, 1":
//       return "U8 F2";
//     case "1, -1, -1":
//       return "R9 D9 B7";
//     case "1, -1, 0":
//       return "R8 D6";
//     case "1, -1, 1":
//       return "R7 D3 F9";
//     case "1, 0, -1":
//       return "R6 B4";
//     case "1, 0, 0":
//       return "R5";
//     case "1, 0, 1":
//       return "R4 F6";
//     case "1, 1, -1":
//       return "R3 U3 B1";
//     case "1, 1, 0":
//       return "R2 U6";
//     case "1, 1, 1":
//       return "R1 U9 F3";
//   }
// };

// const mapPositionToIndex = (position: string): number => {
//   const arr = position.split("");
//   const first = arr[0];
//   const second = parseInt(arr[1]);
//   switch (first) {
//     case "U":
//       return 0 * 9 + second - 1;
//     case "R":
//       return 1 * 9 + second - 1;
//     case "F":
//       return 2 * 9 + second - 1;
//     case "D":
//       return 3 * 9 + second - 1;
//     case "L":
//       return 4 * 9 + second - 1;
//     case "B":
//       return 5 * 9 + second - 1;
//     default:
//       return 0;
//   }
// };

const mapIndexToColor = (char: string) => {
  switch (char) {
    case "U":
      return Purple;
    case "R":
      return Cyan;
    case "F":
      return Yellow;
    case "D":
      return Blue;
    case "L":
      return Red;
    case "B":
      return Green;
    default:
      return Black;
  }
};

// const mapIndexToOriginalIndex = (char: string) => {
//   switch (char) {
//     case "U":
//       return 2;
//     case "R":
//       return 0;
//     case "F":
//       return 4;
//     case "D":
//       return 3;
//     case "L":
//       return 1;
//     case "B":
//       return 5;
//     default:
//       return Black;
//   }
// };
