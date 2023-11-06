import { CubeChild } from "../types/common";

export default (axis: THREE.Vector3, angle: number, cubeChild: CubeChild) => {
  const R = cubeChild.positions.R;
  const L = cubeChild.positions.L;
  const U = cubeChild.positions.U;
  const D = cubeChild.positions.D;
  const F = cubeChild.positions.F;
  const B = cubeChild.positions.B;
  if (axis.x === 1 && axis.y === 0 && axis.z === 0 && angle === -(Math.PI / 2)) {
    //F -> U, U -> B, B -> D, D -> F 
    cubeChild.positions.F = D;
    cubeChild.positions.U = F;
    cubeChild.positions.B = U;
    cubeChild.positions.D = B;
  }else if(axis.x === 1 && axis.y === 0 && axis.z === 0 && angle === Math.PI / 2){
    //F -> D, D -> B, B -> U, U -> F
    cubeChild.positions.F = U;
    cubeChild.positions.D = F;
    cubeChild.positions.B = D;
    cubeChild.positions.U = B;
  }else if(axis.x === 0 && axis.y === 1 && axis.z === 0 && angle === Math.PI / 2){
    //F -> R, R -> B, B -> L, L -> F
    cubeChild.positions.F = L;
    cubeChild.positions.R = F;
    cubeChild.positions.B = R;
    cubeChild.positions.L = B;
  }else if(axis.x === 0 && axis.y === 1 && axis.z === 0 && angle === -(Math.PI / 2)){
    //F -> L, L -> B, B -> R, R -> F
    cubeChild.positions.F = R;
    cubeChild.positions.L = F;
    cubeChild.positions.B = L;
    cubeChild.positions.R = B;
  }
};
