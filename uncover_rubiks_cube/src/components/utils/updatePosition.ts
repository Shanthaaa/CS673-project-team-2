import * as THREE from "three";
export default (cubeChildren: {
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial[], THREE.Object3DEventMap>;
  box: THREE.BoxHelper;
  axis: {
    x: number;
    y: number;
    z: number;
};
}[]) => {
  const worldPosition = new THREE.Vector3();
  for(let i = 0; i < cubeChildren.length; i++){
    const cubeChild = cubeChildren[i];
    cubeChild.cube.getWorldPosition(worldPosition);
    cubeChild.axis.x = ((worldPosition.x < 0.1 && worldPosition.x > 0) || 
    (worldPosition.x < 0 && worldPosition.x > -0.1)) ? 0 : worldPosition.x;
    cubeChild.axis.y = (worldPosition.y < 0.1 && worldPosition.y > 0) || 
    (worldPosition.y < 0 && worldPosition.y > -0.1) ? 0 : worldPosition.y;
    cubeChild.axis.z = (worldPosition.z < 0.1 && worldPosition.z > 0) ||
    (worldPosition.z < 0 && worldPosition.z > -0.1) ? 0 : worldPosition.z;
    if(cubeChild.axis.x > 1 || (cubeChild.axis.x < 0 && cubeChild.axis.x > -1)){
      cubeChild.axis.x = Math.floor(worldPosition.x);
    } else if(cubeChild.axis.x != 0){
      cubeChild.axis.x = Math.ceil(worldPosition.x);
    }
    if(cubeChild.axis.y > 1 || (cubeChild.axis.y < 0 && cubeChild.axis.y > -1)){
      cubeChild.axis.y = Math.floor(cubeChild.axis.y);
    } else if(cubeChild.axis.y != 0){
      cubeChild.axis.y = Math.ceil(cubeChild.axis.y);
    }
    if(cubeChild.axis.z > 1 || (cubeChild.axis.z < 0 && cubeChild.axis.z > -1)){
      cubeChild.axis.z = Math.floor(cubeChild.axis.z);
    } else if(cubeChild.axis.z != 0){
      cubeChild.axis.z = Math.ceil(cubeChild.axis.z);
    }
  }
}