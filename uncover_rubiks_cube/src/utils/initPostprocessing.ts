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

  const outlineColor = [new THREE.Color(0xffffff), new THREE.Color(0xffffff)];

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

  return {
    outlinePass
  }
};
