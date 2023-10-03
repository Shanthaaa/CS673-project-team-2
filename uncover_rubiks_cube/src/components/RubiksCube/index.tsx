import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import useCube from "../hooks/useCube";

export default function RubiksCube() {
  //创建场景
  const scene = new THREE.Scene();
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
  document.body.appendChild(renderer.domElement);

  //创建几何体
  const parentGeometry = new THREE.BoxGeometry(3, 3, 3);
  //创建材质
  const parentMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  //设置父元线框

  parentMaterial.wireframe = true;

  //创建网格
  const parentCube = new THREE.Mesh(parentGeometry, parentMaterial);

  //创建子元素
  // const childGeometry = new THREE.BoxGeometry(1, 1, 1);

  // const cM1 = [
  //   new THREE.MeshBasicMaterial({ color: 0x000000 }),
  //   new THREE.MeshBasicMaterial({ color: 0xff0000 }),
  //   new THREE.MeshBasicMaterial({ color: 0x000000 }),
  //   new THREE.MeshBasicMaterial({ color: 0x0000ff }),
  //   new THREE.MeshBasicMaterial({ color: 0x000000 }),
  //   new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  // ];
  // const cube1 = new THREE.Mesh(childGeometry, cM1);
  // cube1.position.set(-1, -1, -1);
  // const box1 = new THREE.BoxHelper(cube1, 0xffffff);

  // const cM2 = [
  //   new THREE.MeshBasicMaterial({ color: 0x000000 }),
  //   new THREE.MeshBasicMaterial({ color: 0xff0000 }),
  //   new THREE.MeshBasicMaterial({ color: 0x000000 }),
  //   new THREE.MeshBasicMaterial({ color: 0x0000ff }),
  //   new THREE.MeshBasicMaterial({ color: 0x000000 }),
  //   new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
  // ];
  // const cube2 = new THREE.Mesh(childGeometry, cM2);
  // cube2.position.set(-1, -1, 0);

  // parentCube.add(cube2);

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
    child1, child2, child3, child4, child5, child6, child7, child8, child9, 
    child10, child11, child12, child13, child14, child15, child16, child17, child18,
    child19, child20, child21, child22, child23, child24, child25, child26, child27
  ];

  for(let i = 0; i < children.length; i++){
    parentCube.add(children[i].cube, children[i].box,)
  }


  parentCube.position.set(0, 0, 0);

  //将网格添加到场景中
  scene.add(parentCube);

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

  //渲染函数
  function animate() {
    controls.update();
    requestAnimationFrame(animate);
    //渲染
    renderer.render(scene, camera);
  }

  animate();

  //监听窗口变化
  window.addEventListener("resize", () => {
    //重置渲染器宽高
    renderer.setSize(window.innerWidth, window.innerHeight);
    //重置相机宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    //更新相机投影矩阵
    camera.updateProjectionMatrix();
  });
  return <></>;
}
