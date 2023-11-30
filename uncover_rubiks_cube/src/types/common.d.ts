export type CubeChild = {
  cube: THREE.Mesh<
    THREE.BoxGeometry,
    THREE.MeshBasicMaterial[],
    THREE.Object3DEventMap
  >;
  box: THREE.BoxHelper;
  axis: {
    x: number;
    y: number;
    z: number;
  };
  positions: {
    R: number;
    L: number;
    U: number;
    D: number;
    F: number;
    B: number;
  };
};

export enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}

export type SelectedCube = THREE.Object3D<THREE.Object3DEventMap> & {
  object?: any;
};

export type TargetAxis = {
  axis: string,
  value: number
}
