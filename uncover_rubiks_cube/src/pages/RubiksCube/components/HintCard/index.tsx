import { Card } from "antd";
import React, { ForwardRefRenderFunction, forwardRef, useImperativeHandle, useState } from "react";

const HintCard: ForwardRefRenderFunction<{}, {}> = (props, ref) => {
  const [hintContent, setHintContent] = useState(
    "Click Hint button to get the next step"
  );
  useImperativeHandle(ref, () => ({
    setHint
  }))
  const setHint = (solution: string) => {
    setHintContent(solution);
  };
  return (
    <div>
      <Card className="hint-card" title="Hint" style={{ width: 300 }}>
        {hintContent}
      </Card>
    </div>
  );
};

export default forwardRef(HintCard);
