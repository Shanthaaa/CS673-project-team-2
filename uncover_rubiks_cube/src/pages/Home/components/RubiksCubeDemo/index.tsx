import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import useCreateChildren from "../../../../hooks/useCreateChildren";
import "./index.css"

const initalGroup: THREE.Group[] = [];
for (let i = 0; i < 27; i++) {
  initalGroup[i] = new THREE.Group();
}
export default function RubiksCubeDemo() {
  const { children } = useCreateChildren();
  const cubeChildren = children;

  //创建场景
  const scene = new THREE.Scene();
  const [group, setGroup] = useState(new THREE.Group());

  useEffect(() => {
    // //创建场景
    // const scene = new THREE.Scene();
    //创建相机
    const camera = new THREE.PerspectiveCamera(
      75, //视角
      window.innerWidth / window.innerHeight, //宽高比
      0.1, //近平面
      1000 //远平面
    );
    //创建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * 2 / 3, window.innerHeight * 2 / 3);
    document.getElementById("demo-container")?.appendChild(renderer.domElement);

    for (let i = 0; i < cubeChildren.length; i++) {
      group.add(cubeChildren[i].cube, cubeChildren[i].box);
    }

    scene.add(group);

    //设置相机位置
    camera.position.z = 5;
    camera.position.y = 2;
    camera.position.x = 2;
    camera.lookAt(0, 0, 0);

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
  }, []);

  return (
    <div className="wrapper">
      <div id="demo-container">
      </div>
    </div>
  );
}
