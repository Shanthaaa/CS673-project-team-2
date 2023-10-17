import useCube from "./useCube";

export default () => {
    //创建子元素
    const child1 = useCube(
      [0x000000, 0xff0000, 0x000000, 0x0000ff, 0x000000, 0x00ff00],
      [-1, -1, -1]
    );
  
    const child2 = useCube(
      [0x000000, 0xff0000, 0x000000, 0x0000ff, 0x000000, 0x000000],
      [-1, -1, 0]
    );
  
    const child3 = useCube(
      [0x000000, 0xff0000, 0x000000, 0x0000ff, 0xffff00, 0x000000],
      [-1, -1, 1]
    );
  
    const child4 = useCube(
      [0x000000, 0xff0000, 0x000000, 0x000000, 0x000000, 0x00ff00],
      [-1, 0, -1]
    );
  
    const child5 = useCube(
      [0x000000, 0xff0000, 0x000000, 0x000000, 0x000000, 0x000000],
      [-1, 0, 0]
    );
  
    const child6 = useCube(
      [0x000000, 0xff0000, 0x000000, 0x000000, 0xffff00, 0x000000],
      [-1, 0, 1]
    );
  
    const child7 = useCube(
      [0x000000, 0xff0000, 0xff00ff, 0x000000, 0x000000, 0x00ff00],
      [-1, 1, -1]
    );
  
    const child8 = useCube(
      [0x000000, 0xff0000, 0xff00ff, 0x000000, 0x000000, 0x000000],
      [-1, 1, 0]
    );
  
    const child9 = useCube(
      [0x000000, 0xff0000, 0xff00ff, 0x000000, 0xffff00, 0x000000],
      [-1, 1, 1]
    );
  
    const child10 = useCube(
      [0x000000, 0x000000, 0x000000, 0x0000ff, 0x000000, 0x00ff00],
      [0, -1, -1]
    );
  
    const child11 = useCube(
      [0x000000, 0x000000, 0x000000, 0x0000ff, 0x000000, 0x000000],
      [0, -1, 0]
    );
  
    const child12 = useCube(
      [0x000000, 0x000000, 0x000000, 0x0000ff, 0xffff00, 0x000000],
      [0, -1, 1]
    );
  
    const child13 = useCube(
      [0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x00ff00],
      [0, 0, -1]
    );
  
    const child14 = useCube(
      [0x000000, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000],
      [0, 0, 0]
    );
  
    const child15 = useCube(
      [0x000000, 0x000000, 0x000000, 0x000000, 0xffff00, 0x000000],
      [0, 0, 1]
    );
  
    const child16 = useCube(
      [0x000000, 0x000000, 0xff00ff, 0x000000, 0x000000, 0x00ff00],
      [0, 1, -1]
    );
  
    const child17 = useCube(
      [0x000000, 0x000000, 0xff00ff, 0x000000, 0x000000, 0x000000],
      [0, 1, 0]
    );
  
    const child18 = useCube(
      [0x000000, 0x000000, 0xff00ff, 0x000000, 0xffff00, 0x000000],
      [0, 1, 1]
    );
  
    const child19 = useCube(
      [0x00ffff, 0x000000, 0x000000, 0x0000ff, 0x000000, 0x00ff00],
      [1, -1, -1]
    );
  
    const child20 = useCube(
      [0x00ffff, 0x000000, 0x000000, 0x0000ff, 0x000000, 0x000000],
      [1, -1, 0]
    );
  
    const child21 = useCube(
      [0x00ffff, 0x000000, 0x000000, 0x0000ff, 0xffff00, 0x000000],
      [1, -1, 1]
    );
  
    const child22 = useCube(
      [0x00ffff, 0x000000, 0x000000, 0x000000, 0x000000, 0x00ff00],
      [1, 0, -1]
    );
  
    const child23 = useCube(
      [0x00ffff, 0x000000, 0x000000, 0x000000, 0x000000, 0x000000],
      [1, 0, 0]
    );
  
    const child24 = useCube(
      [0x00ffff, 0x000000, 0x000000, 0x000000, 0xffff00, 0x000000],
      [1, 0, 1]
    );
  
    const child25 = useCube(
      [0x00ffff, 0x000000, 0xff00ff, 0x000000, 0x000000, 0x00ff00],
      [1, 1, -1]
    );
  
    const child26 = useCube(
      [0x00ffff, 0x000000, 0xff00ff, 0x000000, 0x000000, 0x000000],
      [1, 1, 0]
    );
  
    const child27 = useCube(
      [0x00ffff, 0x000000, 0xff00ff, 0x000000, 0xffff00, 0x000000],
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

    return{
      children
    }
}