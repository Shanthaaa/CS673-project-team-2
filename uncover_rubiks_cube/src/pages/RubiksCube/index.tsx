import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import "./index.css";
import { FloatButton, Button } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  RedoOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import useCreateChildren from "../../hooks/useCreateChildren";
import updatePosition from "../../utils/updatePosition";
import { CubeChild, SelectedCube, TargetAxis } from "../../types/common";
import { useNavigate } from "react-router-dom";
import setColor from "../../utils/setColor";
import updateColor from "../../utils/updateColor";
import getColor from "../../utils/getColor";
import HintCard from "./components/HintCard";
import initPostprocessing from "../../utils/initPostprocessing";
import initEnv from "../../utils/initEnv";
import {
  getCubeStatusAPI,
  getHintAPI,
  getRandomCube,
  resetCubeStatusAPI,
  setCubeStatusAPI,
} from "../../services/RubiksCube";
import getAxisAndAngle from "../../utils/getAxisAndAngle";

export default function RubiksCube() {
  const initalGroup: THREE.Group[] = [];
  for (let i = 0; i < 27; i++) {
    initalGroup[i] = new THREE.Group();
  }

  const { children } = useCreateChildren();
  const cubeChildren = children;

  //创建场景
  const scene = new THREE.Scene();
  const group = new THREE.Group();
  const rotatedGroup = initalGroup;

  const hintCard = useRef<{ setHint: (solution: string) => {} }>(null);
  let selectedChild: CubeChild;

  enum Direction {
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right",
    CLOCKWISE = "clockwise",
    COUNTERCLOCKWISE = "counterclockwise",
  }

  const { UP, DOWN, LEFT, RIGHT, CLOCKWISE, COUNTERCLOCKWISE } = Direction;

  let update: any = () => {};

  const rotateFace = (
    direction?: Direction,
    targetAxis?: TargetAxis,
    angle?: number
  ) => {
    let axis: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    let targetValue = 0;
    angle = angle ? angle : 0;
    if (direction) {
      axis =
        direction === UP || direction === DOWN
          ? new THREE.Vector3(1, 0, 0)
          : direction === LEFT || direction === RIGHT
          ? new THREE.Vector3(0, 1, 0)
          : new THREE.Vector3(0, 0, 1);
      targetValue =
        direction === UP || direction === DOWN
          ? selectedChild?.axis.x
          : direction === LEFT || direction === RIGHT
          ? selectedChild?.axis.y
          : selectedChild?.axis.z;
      angle =
        direction === UP || direction === LEFT || direction === CLOCKWISE
          ? -(Math.PI / 2)
          : Math.PI / 2;
    } else if (targetAxis) {
      axis =
        targetAxis.axis === "x"
          ? new THREE.Vector3(1, 0, 0)
          : targetAxis.axis === "y"
          ? new THREE.Vector3(0, 1, 0)
          : new THREE.Vector3(0, 0, 1);
      targetValue = targetAxis.value;
    }

    group.clear();
    const cubes: CubeChild[] = [];

    for (let i = 0; i < cubeChildren.length; i++) {
      let compareAxis = 0;
      if (direction) {
        compareAxis =
          direction === UP || direction === DOWN
            ? cubeChildren[i].axis.x
            : direction === LEFT || direction === RIGHT
            ? cubeChildren[i].axis.y
            : cubeChildren[i].axis.z;
      } else if (targetAxis) {
        compareAxis =
          targetAxis.axis === "x"
            ? cubeChildren[i].axis.x
            : targetAxis.axis === "y"
            ? cubeChildren[i].axis.y
            : cubeChildren[i].axis.z;
      }
      if (compareAxis === targetValue) {
        rotatedGroup[i].clear();
        rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
        let rotationAngle = (targetValue * angle) / 10;
        let limit = targetValue * angle;
        if (
          direction === UP ||
          direction === DOWN ||
          direction === LEFT ||
          direction === RIGHT
        ) {
          rotationAngle = (Math.abs(targetValue) * angle) / 10;
          limit = Math.abs(targetValue) * angle;
        }
        update(
          rotatedGroup[i],
          axis,
          rotationAngle,
          limit,
          0,
          cubeChildren[i],
          cubes
        );
      } else {
        rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
      }
    }
  };

  const rotateByHint = (hint: string) => {
    const { targetAxis, angle } = getAxisAndAngle(hint);
    console.log(targetAxis, angle);
    if (angle === Math.PI) {
      rotateFace(undefined, targetAxis, Math.PI / 2);
      rotateFace(undefined, targetAxis, Math.PI / 2);
    } else {
      rotateFace(undefined, targetAxis, angle);
    }
  };

  const randomScramble = async () => {
    const res = await getRandomCube();
    setColor(res.data.cube_state, cubeChildren);
    group.clear();
    for (let i = 0; i < cubeChildren.length; i++) {
      rotatedGroup[i].clear();
      rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
    }
  }

  const reset = async () => {
    await resetCubeStatusAPI();
    const res = await getCubeStatusAPI();
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
    const res = await setCubeStatusAPI(cubeStatus);
    console.log(res);
  };

  const getHint = async () => {
    const cubeStatus = getColor(cubeChildren);
    const res = await getHintAPI(cubeStatus);
    hintCard.current?.setHint(res.data.solution);
  };

  useEffect(() => {
    (async () => {
      const res = await getCubeStatusAPI();

      setColor(res.data.cube_status, cubeChildren);

      for (let i = 0; i < cubeChildren.length; i++) {
        group.add(cubeChildren[i].cube, cubeChildren[i].box);
      }

      scene.add(...rotatedGroup);
      scene.add(group);

      const { camera, renderer, controls, raycaster, mouse, selectedObjects } =
        initEnv(scene);

      const { outlinePass } = initPostprocessing(
        renderer,
        scene,
        camera,
        controls
      );

      update = (
        rotatedGroupItem: THREE.Group<THREE.Object3DEventMap>,
        axis: THREE.Vector3,
        angle: number,
        limit: number,
        cur: number,
        cubeChild: CubeChild,
        cubes: CubeChild[]
      ) => {
        if (Math.abs(cur) >= Math.abs(limit)) {
          updateColor(axis, limit, cubeChild);
          scene.updateMatrixWorld(true);
          cubes.push(cubeChild);
          updatePosition(cubes);
          return;
        }
        cur += angle;
        requestAnimationFrame(() =>
          update(rotatedGroupItem, axis, angle, limit, cur, cubeChild, cubes)
        );
        rotatedGroupItem.rotateOnWorldAxis(axis, angle);
        renderer.render(scene, camera);
      };

      renderer.domElement.addEventListener("click", (event) => {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
          const selectedObject: SelectedCube = intersects[0].object;
          if (selectedObject.object) {
            selectedObjects.splice(0, selectedObjects.length);
            selectedObjects.push(selectedObject.object);
            selectedChild = cubeChildren.filter(
              (v) => v.box.uuid === selectedObject.uuid
            )[0];
          }
          outlinePass.selectedObjects = selectedObjects;
        }
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
          <HintCard ref={hintCard} rotateByHint={rotateByHint} />
          <Button type="primary" className="exit-button" onClick={backHome}>
            Exit Game
          </Button>
          <Button type="primary" className="scramble-button" onClick={randomScramble}>
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
            onClick={() => rotateFace(UP)}
          />
          <FloatButton
            icon={<ArrowDownOutlined />}
            type="primary"
            style={{ right: 95 }}
            onClick={() => rotateFace(DOWN)}
          />
          <FloatButton
            icon={<ArrowRightOutlined />}
            type="primary"
            style={{ right: 165 }}
            onClick={() => rotateFace(RIGHT)}
          />
          <FloatButton
            icon={<ArrowLeftOutlined />}
            type="primary"
            style={{ right: 235 }}
            onClick={() => rotateFace(LEFT)}
          />
          <FloatButton
            icon={<RedoOutlined />}
            type="primary"
            style={{ right: 305 }}
            onClick={() => rotateFace(CLOCKWISE)}
          />
          <FloatButton
            icon={<UndoOutlined />}
            type="primary"
            style={{ right: 375 }}
            onClick={() => rotateFace(COUNTERCLOCKWISE)}
          />
        </>
      </div>
    </div>
  );
}
