import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default (scene: THREE.Scene) => {
  //创建相机
  const camera = new THREE.PerspectiveCamera(
    75, //视角
    window.innerWidth / window.innerHeight, //宽高比
    0.1, //近平面
    1000 //远平面
  );

  //创建渲染器
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container")?.appendChild(renderer.domElement);

  //设置相机位置
  camera.position.z = 5;
  camera.position.y = 2;
  camera.position.x = 2;
  camera.lookAt(0, 0, 0);

  //添加世界坐标辅助器
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  //添加轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  //设置带阻尼的惯性
  controls.enableDamping = true;
  //设置阻尼系数
  controls.dampingFactor = 0.05;

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const selectedObjects: THREE.Object3D<THREE.Object3DEventMap>[] = [];

  return{
    camera,
    renderer,
    controls,
    raycaster,
    mouse,
    selectedObjects
  }
};
