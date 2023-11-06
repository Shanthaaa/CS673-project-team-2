import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./index.css";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { FloatButton, Button, Card } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import useCreateChildren from "../../hooks/useCreateChildren";
import updatePosition from "../../utils/updatePosition";
import type { CubeChild } from "../../types/common";
import { useNavigate } from "react-router-dom";
import { http } from "../../utils/http";
import setColor from "../../utils/setColor";
import { CubeData, Solution } from "../../types/http";
import updateColor from "../../utils/updateColor";
import getColor from "../../utils/getColor";
import HintCard from "./components/HintCard";

export default function RubiksCube() {
  const initalGroup: THREE.Group[] = [];
  for (let i = 0; i < 27; i++) {
    initalGroup[i] = new THREE.Group();
  }

  const { children } = useCreateChildren();
  const cubeChildren = children;

  //创建场景
  const scene = new THREE.Scene();
  // const group = new THREE.Group();
  // const rotatedGroup = initalGroup;
  const [group, setGroup] = useState(new THREE.Group());
  const [rotatedGroup, setRotatedGroup] = useState(initalGroup);
  // const [hintContent, setHintContent] = useState("Click Hint button to get the next step");

  let hintCard = useRef<{setHint: (solution: string) => {}}>(null);
  let selectedChild: CubeChild;

  const upRoatation = () => {
    group.clear();
    const target = selectedChild?.axis.x;
    const cubes = [];
    for (let i = 0; i < cubeChildren.length; i++) {
      if (cubeChildren[i].axis.x == target) {
        // rotatedGroup.add(cubeChildren[i].cube, cubeChildren[i].box);
        // cubes.push(cubeChildren[i]);
        rotatedGroup[i].clear();
        rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
        const axis = new THREE.Vector3(1, 0, 0);
        rotatedGroup[i].rotateOnWorldAxis(axis, -(Math.PI / 2));
        updateColor(axis, -(Math.PI / 2), cubeChildren[i]);
        scene.updateMatrixWorld(true);
        cubes.push(cubeChildren[i]);
      } else {
        rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
        // group.add(cubeChildren[i].cube, cubeChildren[i].box);
      }
    }
    // const axis = new THREE.Vector3(1, 0, 0);
    // rotatedGroup.rotateOnWorldAxis(axis, Math.PI / 2);
    // scene.updateMatrixWorld(true);
    // updatePosition(cubes);
    updatePosition(cubes);
  };

  const downRotation = () => {
    group.clear();
    const target = selectedChild?.axis.x;
    const cubes = [];
    for (let i = 0; i < cubeChildren.length; i++) {
      if (cubeChildren[i].axis.x == target) {
        // rotatedGroup.add(cubeChildren[i].cube, cubeChildren[i].box);
        rotatedGroup[i].clear();
        rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
        const axis = new THREE.Vector3(1, 0, 0);
        rotatedGroup[i].rotateOnWorldAxis(axis, Math.PI / 2);
        updateColor(axis, Math.PI / 2, cubeChildren[i]);
        scene.updateMatrixWorld(true);
        cubes.push(cubeChildren[i]);
      } else {
        // group.add(cubeChildren[i].cube, cubeChildren[i].box);
        rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
      }
    }
    // const axis = new THREE.Vector3(0, 1, 0);
    // rotatedGroup.rotateOnWorldAxis(axis, Math.PI / 2);
    // scene.updateMatrixWorld(true);
    updatePosition(cubes);
  };

  const rightRotation = () => {
    group.clear();
    const target = selectedChild?.axis.y;
    const cubes = [];
    for (let i = 0; i < cubeChildren.length; i++) {
      if (cubeChildren[i].axis.y == target) {
        // rotatedGroup.add(cubeChildren[i].cube, cubeChildren[i].box);
        rotatedGroup[i].clear();
        rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
        const axis = new THREE.Vector3(0, 1, 0);
        rotatedGroup[i].rotateOnWorldAxis(axis, Math.PI / 2);
        updateColor(axis, Math.PI / 2, cubeChildren[i]);
        scene.updateMatrixWorld(true);
        cubes.push(cubeChildren[i]);
      } else {
        // group.add(cubeChildren[i].cube, cubeChildren[i].box);
        rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
      }
    }
    // const axis = new THREE.Vector3(0, 1, 0);
    // rotatedGroup.rotateOnWorldAxis(axis, Math.PI / 2);
    // scene.updateMatrixWorld(true);
    updatePosition(cubes);
  };

  const leftRotation = () => {
    group.clear();
    const target = selectedChild?.axis.y;
    const cubes = [];
    for (let i = 0; i < cubeChildren.length; i++) {
      if (cubeChildren[i].axis.y == target) {
        // rotatedGroup.add(cubeChildren[i].cube, cubeChildren[i].box);
        rotatedGroup[i].clear();
        rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
        const axis = new THREE.Vector3(0, 1, 0);
        rotatedGroup[i].rotateOnWorldAxis(axis, -(Math.PI / 2));
        updateColor(axis, -(Math.PI / 2), cubeChildren[i]);
        scene.updateMatrixWorld(true);
        cubes.push(cubeChildren[i]);
      } else {
        // group.add(cubeChildren[i].cube, cubeChildren[i].box);
        rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
      }
    }
    // const axis = new THREE.Vector3(0, 1, 0);
    // rotatedGroup.rotateOnWorldAxis(axis, Math.PI / 2);
    // scene.updateMatrixWorld(true);
    updatePosition(cubes);
  };

  const reset = async () => {
    await http({
      method: "POST",
      url: "/v1/reset_cube_status",
    });
    const res = await http<CubeData>({
      method: "GET",
      url: "/v1/get_cube_status",
    });
    setColor(res.data.cube_status, cubeChildren);
    group.clear();
    for (let i = 0; i < cubeChildren.length; i++) {
      rotatedGroup[i].clear();
      rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
    }
  };

  const save = async () => {
    const cubeStatus = getColor(cubeChildren);
    console.log(cubeStatus);
    const res = await http({
      method: "POST",
      url: "/v1/set_cube_status",
      data: {
        cube_status: cubeStatus,
      },
    });
    console.log(res);
  };

  const getHint = async () => {
    const cubeStatus = getColor(cubeChildren);
    const res = await http<Solution>({
      method: "POST",
      url: "/v1/solve",
      data: {
        cube_state: cubeStatus,
      },
    });
    hintCard.current?.setHint(res.data.solution);
    // setHintContent(res.data.solution);
  };

  useEffect(() => {
    (async function () {
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
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("container")?.appendChild(renderer.domElement);

      const res = await http<CubeData>({
        method: "GET",
        url: "/v1/get_cube_status",
      });

      setColor(res.data.cube_status, cubeChildren);

      for (let i = 0; i < cubeChildren.length; i++) {
        // scene.add(cubeChildren[i].cube, cubeChildren[i].box);
        group.add(cubeChildren[i].cube, cubeChildren[i].box);
        // rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
      }

      scene.add(...rotatedGroup);
      // scene.add(rotatedGroup);
      scene.add(group);

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

      //初始化
      // postprocessing
      const size = renderer.getSize(new THREE.Vector2());
      const _pixelRatio = renderer.getPixelRatio();
      const _width = size.width;
      const _height = size.height;
      const renderTarget = new THREE.WebGLRenderTarget(
        _width * _pixelRatio,
        _height * _pixelRatio,
        {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          format: THREE.RGBAFormat,
        }
      );
      renderTarget.texture.name = "EffectComposer.rt1";
      const composer = new EffectComposer(renderer, renderTarget);

      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const outlinePass = new OutlinePass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        scene,
        camera
      );
      composer.addPass(outlinePass);

      const effectFXAA = new ShaderPass(FXAAShader);
      effectFXAA.uniforms["resolution"].value.set(
        1 / window.innerWidth,
        1 / window.innerHeight
      );
      composer.addPass(effectFXAA);

      const outlineColor = [
        new THREE.Color(0xffffff),
        new THREE.Color(0xffffff),
      ];

      outlinePass.visibleEdgeColor.set(outlineColor[0]); // 边缘可见部分发颜色 sColor[0].color
      outlinePass.hiddenEdgeColor.set(outlineColor[1]); // 边缘遮挡部分发光颜色 sColor[1].color
      outlinePass.edgeStrength = Number(10.0); //边框的亮度
      outlinePass.edgeGlow = Number(1); //光晕[0,1]
      outlinePass.edgeThickness = Number(1.0); //边缘浓度
      outlinePass.pulsePeriod = Number(10); //呼吸闪烁的速度 闪烁频率 ，默认0 ，值越大频率越低
      outlinePass.usePatternTexture = false; //是否使用父级的材质
      outlinePass.downSampleRatio = 2; // 边框弯曲度
      outlinePass.clear = true;

      //渲染函数
      function animate() {
        controls.update();
        requestAnimationFrame(animate);
        //渲染
        // renderer.render(scene, camera);
        composer.render();
      }

      animate();

      //监听窗口变化
      window.addEventListener("resize", () => {
        //重置渲染器宽高
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);
        //重置相机宽高比
        camera.aspect = window.innerWidth / window.innerHeight;
        //更新相机投影矩阵
        camera.updateProjectionMatrix();
      });

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      // document.addEventListener("mousemove", onDocumentMouseMove, false);

      let selectedObjects: THREE.Object3D<THREE.Object3DEventMap>[] = [];
      function addSelectedObject(object: any) {
        selectedObjects = [];
        selectedObjects.push(object);
      }

      // function onDocumentMouseMove(event: MouseEvent) {
      //   event.preventDefault();
      //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      //   raycaster.setFromCamera(mouse, camera);
      //   var intersects = raycaster.intersectObjects(scene.children);
      //   if (intersects.length > 0) {
      //     const selectedObject: THREE.Object3D<THREE.Object3DEventMap> & {
      //       object?: any;
      //     } = intersects[0].object;
      //     if (selectedObject.object) {
      //       addSelectedObject(selectedObject.object);
      //     }
      //     outlinePass.selectedObjects = selectedObjects;
      //   } else {
      //     outlinePass.selectedObjects = [];
      //   }
      // }

      renderer.domElement.addEventListener("click", (event) => {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        var intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
          const selectedObject: THREE.Object3D<THREE.Object3DEventMap> & {
            object?: any;
          } = intersects[0].object;
          if (selectedObject.object) {
            addSelectedObject(selectedObject.object);
            for (let i = 0; i < cubeChildren.length; i++) {
              if (cubeChildren[i].box.uuid == selectedObject.uuid) {
                console.log("click", i, cubeChildren[i]);
                selectedChild = cubeChildren[i];
              }
            }
          }
          outlinePass.selectedObjects = selectedObjects;
        }
        // else {
        //   outlinePass.selectedObjects = [];
        //   setShowButton(false);
        // }
      });
    })();
  }, []);

  const navigate = useNavigate();

  const backHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <div id="container">
        <>
          {/* <Card className="hint-card" title="Hint" style={{ width: 300 }}>
            {hintContent}
          </Card> */}
          <HintCard ref={hintCard}/>
          <Button type="primary" className="exit-button" onClick={backHome}>
            Exit Game
          </Button>
          <Button type="primary" className="scramble-button">
            Random Scramble
          </Button>
          <Button type="primary" className="reset-button" onClick={reset}>
            Reset
          </Button>
          <Button type="primary" className="hint-button" onClick={getHint}>
            Hint
          </Button>
          <Button type="primary" className="save-button" onClick={save}>
            Save
          </Button>
          <FloatButton
            icon={<ArrowUpOutlined />}
            type="primary"
            style={{ right: 25 }}
            onClick={upRoatation}
          />
          <FloatButton
            icon={<ArrowDownOutlined />}
            type="primary"
            style={{ right: 95 }}
            onClick={downRotation}
          />
          <FloatButton
            icon={<ArrowRightOutlined />}
            type="primary"
            style={{ right: 165 }}
            onClick={rightRotation}
          />
          <FloatButton
            icon={<ArrowLeftOutlined />}
            type="primary"
            style={{ right: 235 }}
            onClick={leftRotation}
          />
        </>
      </div>
    </div>
  );
}
