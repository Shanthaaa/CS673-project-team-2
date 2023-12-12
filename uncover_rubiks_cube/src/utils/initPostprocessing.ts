import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
export default (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  controls: OrbitControls
) => {
  // initialization postprocessing
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

  const outlineColor = [new THREE.Color(0xffffff), new THREE.Color(0xffffff)];

  //the color of the visible part of the edge
  outlinePass.visibleEdgeColor.set(outlineColor[0]);
  //the color of occlusion part of edge
  outlinePass.hiddenEdgeColor.set(outlineColor[1]);
  //the brightness of the border
  outlinePass.edgeStrength = Number(10.0);
  outlinePass.edgeGlow = Number(1);
  outlinePass.edgeThickness = Number(1.0);
  //flashing frequency
  outlinePass.pulsePeriod = Number(10);
  outlinePass.usePatternTexture = false;
  //frame curvature
  outlinePass.downSampleRatio = 2;
  outlinePass.clear = true;

  //render function
  function animate() {
    controls.update();
    requestAnimationFrame(animate);
    //perform rendering
    // renderer.render(scene, camera);
    composer.render();
  }

  //start rendering
  animate();

  //listen the resize event for window
  window.addEventListener("resize", () => {
    //reset the width and height for renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    //reset the aspect ratio of camera
    camera.aspect = window.innerWidth / window.innerHeight;
    //update camera projection matrix
    camera.updateProjectionMatrix();
  });

  return {
    outlinePass,
  };
};
