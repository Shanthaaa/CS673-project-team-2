import React, { useEffect } from "react";
import * as THREE from "three";
import useCreateChildren from "../../../../hooks/useCreateChildren";
import "./index.css";
import initDemo from "../../../../utils/initDemo";

export default function RubiksCubeDemo() {

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

  useEffect(() => {
    //when component is mounted, add all cube and box of 27 child cubes into the group
    for (let i = 0; i < cubeChildren.length; i++) {
      group.add(cubeChildren[i].cube, cubeChildren[i].box);
    }
    //add group into the scene
    scene.add(group);
    //initialize the scene for the demo of Rubik's Cube
    initDemo(cubeChildren, scene);
  }, []);

  return (
    <div className="wrapper">
      {/* demo container */}
      <div id="demo-container"></div>
    </div>
  );
}
