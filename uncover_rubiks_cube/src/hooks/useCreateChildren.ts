import useCube from "./useCube";

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
//R L U D F B
export default () => {
  //创建子元素
  //L7 D7 B9
  const child1 = useCube([Black, Red, Black, Blue, Black, Green], [-1, -1, -1]);
  //L8 D4
  const child2 = useCube([Black, Red, Black, Blue, Black, Black], [-1, -1, 0]);
  //L9 D1 F7
  const child3 = useCube([Black, Red, Black, Blue, Yellow, Black], [-1, -1, 1]);
  //L4 B6 
  const child4 = useCube([Black, Red, Black, Black, Black, Green], [-1, 0, -1]);
  //L5
  const child5 = useCube([Black, Red, Black, Black, Black, Black], [-1, 0, 0]);
  //L6 F4 
  const child6 = useCube([Black, Red, Black, Black, Yellow, Black], [-1, 0, 1]);
  //L1 U1 B3
  const child7 = useCube(
    [Black, Red, Purple, Black, Black, Green],
    [-1, 1, -1]
  );
  //L2 U4
  const child8 = useCube([Black, Red, Purple, Black, Black, Black], [-1, 1, 0]);
  //L3 U7 F1
  const child9 = useCube(
    [Black, Red, Purple, Black, Yellow, Black],
    [-1, 1, 1]
  );
  //D8 B8
  const child10 = useCube(
    [Black, Black, Black, Blue, Black, Green],
    [0, -1, -1]
  );
  //D5
  const child11 = useCube(
    [Black, Black, Black, Blue, Black, Black],
    [0, -1, 0]
  );
  //D2 F8
  const child12 = useCube(
    [Black, Black, Black, Blue, Yellow, Black],
    [0, -1, 1]
  );
  //B5
  const child13 = useCube(
    [Black, Black, Black, Black, Black, Green],
    [0, 0, -1]
  );
  const child14 = useCube(
    [Black, Black, Black, Black, Black, Black],
    [0, 0, 0]
  );
  //F5
  const child15 = useCube(
    [Black, Black, Black, Black, Yellow, Black],
    [0, 0, 1]
  );
  //U2 B2
  const child16 = useCube(
    [Black, Black, Purple, Black, Black, Green],
    [0, 1, -1]
  );
  //U5
  const child17 = useCube(
    [Black, Black, Purple, Black, Black, Black],
    [0, 1, 0]
  );
  //U8 F2
  const child18 = useCube(
    [Black, Black, Purple, Black, Yellow, Black],
    [0, 1, 1]
  );
  //R9 D9 B7
  const child19 = useCube(
    [Cyan, Black, Black, Blue, Black, Green],
    [1, -1, -1]
  );
  //R8 D6
  const child20 = useCube([Cyan, Black, Black, Blue, Black, Black], [1, -1, 0]); 
  //R7 D3 F9
  const child21 = useCube(
    [Cyan, Black, Black, Blue, Yellow, Black],
    [1, -1, 1]
  );
  //R6 B4
  const child22 = useCube(
    [Cyan, Black, Black, Black, Black, Green],
    [1, 0, -1]
  );
  //R5
  const child23 = useCube([Cyan, Black, Black, Black, Black, Black], [1, 0, 0]);
  //R4 F6
  const child24 = useCube(
    [Cyan, Black, Black, Black, Yellow, Black],
    [1, 0, 1]
  );
  //R3 U3 B1
  const child25 = useCube(
    [Cyan, Black, Purple, Black, Black, Green],
    [1, 1, -1]
  );
  //R2 U6
  const child26 = useCube(
    [Cyan, Black, Purple, Black, Black, Black],
    [1, 1, 0]
  );
  //R1 U9 F3
  const child27 = useCube(
    [Cyan, Black, Purple, Black, Yellow, Black],
    [1, 1, 1]
  );

  const children = [
    child1,
    child2,
    child3,
    child4,
    child5,
    child6,
    child7,
    child8,
    child9,
    child10,
    child11,
    child12,
    child13,
    child14,
    child15,
    child16,
    child17,
    child18,
    child19,
    child20,
    child21,
    child22,
    child23,
    child24,
    child25,
    child26,
    child27,
  ];

  return {
    children,
  };
};
