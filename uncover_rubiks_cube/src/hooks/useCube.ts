import * as THREE from "three";
import { CubeChild } from "../types/common";

export default function useCube(
  colors: THREE.ColorRepresentation[],
  axes: number[]
): CubeChild {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material: THREE.MeshBasicMaterial[] = [];
  for (let i = 0; i < colors.length; i++) {
    material.push(new THREE.MeshBasicMaterial({ color: colors[i] }));
  }
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(axes[0], axes[1], axes[2]);
  const box = new THREE.BoxHelper(cube, 0x000000);
  const axis = { x: axes[0], y: axes[1], z: axes[2] };
  const positions = {
    R: 0,
    L: 1,
    U: 2,
    D: 3,
    F: 4,
    B: 5,
  };
  return {
    cube,
    box,
    axis,
    positions,
  };
}
