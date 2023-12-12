import { CubeChild } from "../types/common";
import { mapAxisToPositon, mapPositionToIndex } from "./common/color";

/**
 * get color data of the Rubik's Cube
 */
export default (children: CubeChild[]) => {
  const cubeStatus = new Array(54);
  for (let i = 0; i < children.length; i++) {
    let str = `${children[i].axis.x}, ${children[i].axis.y}, ${children[i].axis.z}`;
    console.log(str, children[i]);
    const temp = mapAxisToPositon(str);
    const positions = temp?.split(" ");
    if (positions) {
      for (let j = 0; j < positions.length; j++) {
        //alphabet + digit
        const position = positions[j];
        //index of cubeStatus
        const index = mapPositionToIndex(position);
        Object.entries(children[i].positions).forEach((item) => {
          if (item[0] == position[0]) {
            const value = item[1];
            const rgb = children[i].cube.material[value].color;
            const color =  mapRGBToColor(`${rgb.r}${rgb.g}${rgb.b}`);
            cubeStatus[index] = color;
          }
        });
      }
    }
  }
  console.log(cubeStatus.join(""));
  return cubeStatus.join("");
};

// const mapIndexToColor = (char: number) => {
//   switch (char) {
//     case 2:
//       return "U";
//     case 0:
//       return "R";
//     case 4:
//       return "F";
//     case 3:
//       return "D";
//     case 1:
//       return "L";
//     case 5:
//       return "B";
//     default:
//       return "*";
//   }
// };

const mapRGBToColor = (rgb: string) => {
  switch (rgb) {
    case "101":
      return "U";
    case "011":
      return "R";
    case "110":
      return "F";
    case "001":
      return "D";
    case "100":
      return "L";
    case "010":
      return "B";
    default:
      return "*";
  }
};
