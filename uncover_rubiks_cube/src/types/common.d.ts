export type CubeChild = {
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[], THREE.Object3DEventMap>;
  box: THREE.BoxHelper;
  axis: {
      x: number;
      y: number;
      z: number;
  };
};