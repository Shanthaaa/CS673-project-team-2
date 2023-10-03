import * as THREE from "three";

export default function useCube (
  colors: THREE.ColorRepresentation[],
  axes: number[]
) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material: THREE.MeshBasicMaterial[] = [];
  for(let i = 0; i < colors.length; i++){
    material.push(new THREE.MeshBasicMaterial({ color: colors[i] }));
  }
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(axes[0], axes[1], axes[2]);
  const box = new THREE.BoxHelper(cube, 0x000000);
  return {
    cube,
    box,
  };
}
