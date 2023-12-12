import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default (scene: THREE.Scene) => {
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
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container")?.appendChild(renderer.domElement);

  //set the position of camera
  camera.position.z = 5;
  camera.position.y = 2;
  camera.position.x = 2;
  camera.lookAt(0, 0, 0);

  //add axes helper
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  //add controls of orbit
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const selectedObjects: THREE.Object3D<THREE.Object3DEventMap>[] = [];

  return {
    camera,
    renderer,
    controls,
    raycaster,
    mouse,
    selectedObjects,
  };
};
