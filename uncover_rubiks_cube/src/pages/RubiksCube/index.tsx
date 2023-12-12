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
import CustomizeCube from "./components/CustomizeCube";

export default function RubiksCube() {
  //create groups for all 27 cubes
  const initalGroup: THREE.Group[] = [];
  for (let i = 0; i < 27; i++) {
    initalGroup[i] = new THREE.Group();
  }

  //create initial Rubik's Cube
  const { children } = useCreateChildren();
  const cubeChildren = children;

  //create scene
  const scene = new THREE.Scene();
  //create group
  const group = new THREE.Group();
  //create group which will perform rotation
  const rotatedGroup = initalGroup;

  //used to get the instance of HintCard
  const hintCard = useRef<{ setHint: (solution: string) => {} }>(null);
  //memorize selected cube
  let selectedChild: CubeChild;

  //define six types of rotations
  enum Direction {
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right",
    CLOCKWISE = "clockwise",
    COUNTERCLOCKWISE = "counterclockwise",
  }
  const { UP, DOWN, LEFT, RIGHT, CLOCKWISE, COUNTERCLOCKWISE } = Direction;

  //update the Rubik's Cube after rotation
  let update: any = () => {};

  //rotate specific face of the Rubik's Cube
  const rotateFace = (
    direction?: Direction,
    targetAxis?: TargetAxis,
    angle?: number
  ) => {
    let axis: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
    let targetValue = 0;
    //if angle is undefined, angle is set to zero
    angle = angle ? angle : 0;
    if (direction) {
      //when direction is not undefined
      //set rotation axis according to the direction
      axis =
        direction === UP || direction === DOWN
          ? new THREE.Vector3(1, 0, 0)
          : direction === LEFT || direction === RIGHT
          ? new THREE.Vector3(0, 1, 0)
          : new THREE.Vector3(0, 0, 1);
      //set axis value related to rotation of selected cube according to the direction
      targetValue =
        direction === UP || direction === DOWN
          ? selectedChild?.axis.x
          : direction === LEFT || direction === RIGHT
          ? selectedChild?.axis.y
          : selectedChild?.axis.z;
      //set angle of rotation according to the direction
      angle =
        direction === UP || direction === LEFT || direction === CLOCKWISE
          ? -(Math.PI / 2)
          : Math.PI / 2;
    } else if (targetAxis) {
      //when targetAxis is not undefined
      //get rotation axis from targetAxis
      axis =
        targetAxis.axis === "x"
          ? new THREE.Vector3(1, 0, 0)
          : targetAxis.axis === "y"
          ? new THREE.Vector3(0, 1, 0)
          : new THREE.Vector3(0, 0, 1);
      //get axis value related to rotation from targetAxis
      targetValue = targetAxis.value;
    }

    //clear group
    group.clear();
    //save changed cubes
    const cubes: CubeChild[] = [];

    //find cubes that will perform rotation
    for (let i = 0; i < cubeChildren.length; i++) {
      //make sure the axis value related to rotation and compare it with targetValue
      let compareAxis = 0;
      if (direction) {
        //if direction is not undefined, get compareAxis according the direction
        compareAxis =
          direction === UP || direction === DOWN
            ? cubeChildren[i].axis.x
            : direction === LEFT || direction === RIGHT
            ? cubeChildren[i].axis.y
            : cubeChildren[i].axis.z;
      } else if (targetAxis) {
        //if targetAxis is not undefined, get compareAxis from targetAxis
        compareAxis =
          targetAxis.axis === "x"
            ? cubeChildren[i].axis.x
            : targetAxis.axis === "y"
            ? cubeChildren[i].axis.y
            : cubeChildren[i].axis.z;
      }
      if (compareAxis === targetValue) {
        //the cube will perform rotation 
        //clear corresponding rotated group
        rotatedGroup[i].clear();
        //add this cube and its box into the rotated group
        rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
        //calculate unit rotation angle
        let rotationAngle = (targetValue * angle) / 10;
        //calculate total rotation angle
        let limit = targetValue * angle;
        if (
          direction === UP ||
          direction === DOWN ||
          direction === LEFT ||
          direction === RIGHT
        ) {
          //direction is UP, DOWN, LEFT or RIGHT
          //calculate unit rotation angle
          rotationAngle = (Math.abs(targetValue) * angle) / 10;
          //calculate total rotation angle
          limit = Math.abs(targetValue) * angle;
        }
        //perform rotation and some updates
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
        //for cube that will not perform rotation, directly add it into rotated group
        rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
      }
    }
  };

  //rotate Rubik's Cube according the hint
  const rotateByHint = (hint: string) => {
    //get rotation axis and angle
    const { targetAxis, angle } = getAxisAndAngle(hint);
    console.log(targetAxis, angle);
    //rotate Rubik's Cube 90 degrees or 180 degrees
    if (angle === Math.PI) {
      rotateFace(undefined, targetAxis, Math.PI / 2);
      rotateFace(undefined, targetAxis, Math.PI / 2);
    } else {
      rotateFace(undefined, targetAxis, angle);
    }
  };

  //randomly scramble the Rubik's Cube
  const randomScramble = async () => {
    //get random Rubik's Cube state data through API
    const res = await getRandomCube();
    //set color to the Rubik's Cube according the random Rubik's Cube state data
    setColor(res.data.cube_state, cubeChildren);
    console.log("cube_state", res.data.cube_state);
    group.clear();
    //add all cubes and their boxes into rotated groups
    for (let i = 0; i < cubeChildren.length; i++) {
      rotatedGroup[i].clear();
      rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
    }
  };

  //reset the state of the Rubik's Cube
  const reset = async () => {
    //reset the state data of Rubik's Cube through API
    await resetCubeStatusAPI();
    //get state data of Rubik's Cube through API
    const res = await getCubeStatusAPI();
    //set color for the Rubik's Cube
    setColor(res.data.cube_status, cubeChildren);
    group.clear();
    //add all cubes and their boxes into rotated groups
    for (let i = 0; i < cubeChildren.length; i++) {
      rotatedGroup[i].clear();
      rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
    }
  };

  //save state data of Rubik's Cube
  const save = async () => {
    //get state data from the color of Rubik's Cube
    const cubeStatus = getColor(cubeChildren);
    console.log(cubeStatus);
    //save state data of the Rubik's Cube through API
    const res = await setCubeStatusAPI(cubeStatus);
    console.log(res);
  };

  //get hint about how to perform rotations to uncover the Rubik's Cube
  const getHint = async () => {
    //get state data from the color of Rubik's Cube
    const cubeStatus = getColor(cubeChildren);
    console.log("getHint", cubeStatus);
    //send state data of Rubik's Cube to get the hint through API
    const res = await getHintAPI(cubeStatus);
    console.log(res);
    //send hint data to hint card
    hintCard.current?.setHint(res.data.solution);
  };

  //set custom state data for Rubik's Cube
  const setCustomData = (cubeStatus: string) => {
    //set color for the Rubik's Cube
    setColor(cubeStatus, cubeChildren);
    group.clear();
    //add all cubes and their boxes into rotated groups
    for (let i = 0; i < cubeChildren.length; i++) {
      rotatedGroup[i].clear();
      rotatedGroup[i].add(cubeChildren[i].cube, cubeChildren[i].box);
    }
  };

  useEffect(() => {
    (async () => {
      //when component is mounted
      //get cube state data through API
      const res = await getCubeStatusAPI();

      //set color for the Rubik's Cube
      setColor(res.data.cube_status, cubeChildren);

      //add all cubes and their boxes into group
      for (let i = 0; i < cubeChildren.length; i++) {
        group.add(cubeChildren[i].cube, cubeChildren[i].box);
      }

      //add rotated groups and group to the scene
      scene.add(...rotatedGroup);
      scene.add(group);

      //initialize some tools for later use 
      const { camera, renderer, controls, raycaster, mouse, selectedObjects } =
        initEnv(scene);

      //initialize outlinePass
      const { outlinePass } = initPostprocessing(
        renderer,
        scene,
        camera,
        controls
      );

      //update the Rubik's Cube
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
          //when rotation is finished
          //update color for Rubik's Cube after rotation
          updateColor(axis, limit, cubeChild);
          //update coordinate system
          scene.updateMatrixWorld(true);
          //collect rotated cube
          cubes.push(cubeChild);
          //update the coordinate for the rotated cubes
          updatePosition(cubes);
          return;
        }
        //calculate current rotation degree
        cur += angle;
        //update animation of rotation before redrawing next time
        requestAnimationFrame(() =>
          update(rotatedGroupItem, axis, angle, limit, cur, cubeChild, cubes)
        );
        //rotate a specific layer of the Rubik's Cube
        rotatedGroupItem.rotateOnWorldAxis(axis, angle);
        //render again
        renderer.render(scene, camera);
      };

      //show the outline of the selected cube
      renderer.domElement.addEventListener("click", (event) => {
        event.preventDefault();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        //check whether there is an object that has been selected
        const intersects = raycaster.intersectObjects(scene.children);
        if (intersects.length > 0) {
          //get the selected object
          const selectedObject: SelectedCube = intersects[0].object;
          if (selectedObject.object) {
            selectedObjects.splice(0, selectedObjects.length);
            selectedObjects.push(selectedObject.object);
            //find selected cube from Rubik's Cube
            selectedChild = cubeChildren.filter(
              (v) => v.box.uuid === selectedObject.uuid
            )[0];
          }
          //show outline of the selected cube
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
          <CustomizeCube
            className="customize-button"
            setCustomData={setCustomData}
          />
          <Button
            type="primary"
            className="scramble-button"
            onClick={randomScramble}
          >
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
