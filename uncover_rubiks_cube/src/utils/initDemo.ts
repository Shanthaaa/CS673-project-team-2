import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CubeChild } from "../types/common";
export default (cubeChildren: CubeChild[], scene: THREE.Scene) => {
  //create camera
  const camera = new THREE.PerspectiveCamera(
    //perspective
    75, 
    //aspect ratio
    window.innerWidth / window.innerHeight,
    //near plane
    0.1,
    //far plane
    1000
  );
  //create renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize((window.innerWidth * 2) / 3, (window.innerHeight * 2) / 3);
  document.getElementById("demo-container")?.appendChild(renderer.domElement);

  //set the position of camera
  camera.position.z = 5;
  camera.position.y = 2;
  camera.position.x = 2;
  camera.lookAt(0, 0, 0);

  //add controls of orbit
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  //render function
  function animate() {
    controls.update();
    requestAnimationFrame(animate);
    //perform rendering
    renderer.render(scene, camera);
  }

  //start rendering
  animate();

  //listen the resize event for window
  window.addEventListener("resize", () => {
    //reset the width and height for renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    //reset the aspect ratio of camera
    camera.aspect = window.innerWidth / window.innerHeight;
    //update camera projection matrix
    camera.updateProjectionMatrix();
  });
};
