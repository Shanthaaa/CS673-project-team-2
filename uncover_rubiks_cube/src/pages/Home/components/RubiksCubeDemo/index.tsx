import React, { useEffect } from "react";
import * as THREE from "three";
import useCreateChildren from "../../../../hooks/useCreateChildren";
import "./index.css";
import initDemo from "../../../../utils/initDemo";

export default function RubiksCubeDemo() {
  const initalGroup: THREE.Group[] = [];
  for (let i = 0; i < 27; i++) {
    initalGroup[i] = new THREE.Group();
  }
  
  const { children } = useCreateChildren();
  const cubeChildren = children;

  //创建场景
  const scene = new THREE.Scene();
  const group = new THREE.Group();

  useEffect(() => {
    for (let i = 0; i < cubeChildren.length; i++) {
      group.add(cubeChildren[i].cube, cubeChildren[i].box);
    }
    scene.add(group);
    initDemo(cubeChildren, scene);
  }, []);

  return (
    <div className="wrapper">
      <div id="demo-container"></div>
    </div>
  );
}
