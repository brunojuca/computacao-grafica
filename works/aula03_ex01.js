import * as THREE from "../build/three.module.js";
import { GUI } from "../build/jsm/libs/dat.gui.module.js";
import { TrackballControls } from "../build/jsm/controls/TrackballControls.js";
import { TeapotGeometry } from "../build/jsm/geometries/TeapotGeometry.js";
import {
  initRenderer,
  initDefaultSpotlight,
  createGroundPlane,
  onWindowResize,
  degreesToRadians,
  radiansToDegrees,
  createGroundPlaneWired,
} from "../libs/util/util.js";

var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils

const light = new THREE.HemisphereLight();
scene.add(light);

// Main camera
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.lookAt(0, 0, 0);
camera.position.set(0.0, 2.0, 0.0);
camera.up.set(0, 1, 0);

// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer);
  },
  false
);

var groundPlane = createGroundPlaneWired(100, 100, 40, 40); // width, height, resolutionW, resolutionH
//groundPlane.rotateX(degreesToRadians(-90));
scene.add(groundPlane);

// Create helper for the virtual camera
const cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);
scene.add(cameraHolder);

render();

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "Space":
      camera.translateZ(-1);
      break;
    case "ArrowLeft":
      camera.rotateY(degreesToRadians(5));
      break;
    case "ArrowRight":
      camera.rotateY(degreesToRadians(-5));
      break;
    case "ArrowUp":
      camera.rotateX(degreesToRadians(-1));
      break;
    case "ArrowDown":
      camera.rotateX(degreesToRadians(1));
      break;
    case "Comma":
      camera.rotateZ(degreesToRadians(1));
      break;
    case "Period":
      camera.rotateZ(degreesToRadians(-1));
      break;
    default:
      break;
  }
});

function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
