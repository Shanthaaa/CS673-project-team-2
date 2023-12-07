import { Button, Card, Tooltip } from "antd";
import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import "./index.css";
import { nanoid } from "nanoid";

const HintCard: ForwardRefRenderFunction<
  {},
  { rotateByHint: (hint: string) => void }
> = ({ rotateByHint }, ref) => {
  const [showHint, setShowHint] = useState(false);
  const [hintContent, setHintContent] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [index, setIndex] = useState(0);
  useImperativeHandle(ref, () => ({
    setHint,
  }));
  const setHint = (solution: string) => {
    setHintContent(solution);
    setShowButton(true);
    setShowHint(true);
  };
  const rotateOneStep = () => {
    const hint = hintContent.split(" ")[index];
    setIndex(index + 1);
    if (index + 1 === hintContent.split(" ").length) {
      setShowButton(false);
      setShowHint(false);
      setIndex(0);
    }
    rotateByHint(hint);
  };

  const mapIndexToFace = (index: string) => {
    switch (index) {
      case "U":
        return "up face";
      case "R":
        return "right face";
      case "F":
        return "front face";
      case "D":
        return "down face";
      case "L":
        return "left face";
      case "B":
        return "back face";
      default:
        return "no face";
    }
  };
  const translateHint = (hint: string) => {
    const face = mapIndexToFace(hint[0]);
    const angle =
      hint[1] === "'"
        ? "counterclockwise 90"
        : hint[1] === "2"
        ? "180"
        : "clockwise 90";
    return `turn ${face} ${angle} degrees`;
  };
  return (
    <div className="hint-card-container">
      <Card className="hint-card" title="Hint">
        {showHint ? (
          hintContent.split(" ").map((v, i) => (
            <Tooltip key={nanoid()} title={translateHint(v)}>
              <span
                className={i === index ? "selected-step" : "unseleted-step"}
              >
                {v}
              </span>
            </Tooltip>
          ))
        ) : (
          <span>Click Hint button to get the next step</span>
        )}
      </Card>
      {showButton ? (
        <Button onClick={rotateOneStep} type="primary">
          Rotate One Step
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default forwardRef(HintCard);
