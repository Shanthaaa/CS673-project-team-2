import { Button, Card } from "antd";
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
  const [done, setDone] = useState(false);
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
    if (index + 1 === hintContent.split(" ").length){
      setShowButton(false);
      setShowHint(false);
      setIndex(0);
    }
    rotateByHint(hint);
  };
  return (
    <div className="hint-card-container">
      <Card className="hint-card" title="Hint">
        {showHint ? (
          hintContent.split(" ").map((v, i) => {
            return i === index ? (
              <span key={nanoid()} className="selected-step">{v}</span>
            ) : (
              <span key={nanoid()} className="unseleted-step">{v}</span>
            );
          })
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
