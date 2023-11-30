import { TargetAxis } from "../types/common";

export default (hint: string) => {
  const targetAxis: TargetAxis = { axis: "x", value: 1 };
  const angle =
    hint[1] === "'" ? Math.PI / 2 : hint[1] === "2" ? Math.PI : -(Math.PI / 2);
  console.log(hint[1]);
  switch (hint[0]) {
    case "U":
      targetAxis.axis = "y";
      targetAxis.value = 1;
      break;
    case "R":
      targetAxis.axis = "x";
      targetAxis.value = 1;
      break;
    case "F":
      targetAxis.axis = "z";
      targetAxis.value = 1;
      break;
    case "D":
      targetAxis.axis = "y";
      targetAxis.value = -1;
      break;
    case "L":
      targetAxis.axis = "x";
      targetAxis.value = -1;
      break;
    case "B":
      targetAxis.axis = "z";
      targetAxis.value = -1;
      break;
  }
  return {
    targetAxis,
    angle,
  };
};
