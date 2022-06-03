import * as THREE from "../build/three.module.js";
import Stats from "../build/jsm/libs/stats.module.js";
import { TrackballControls } from "../build/jsm/controls/TrackballControls.js";
import {
  initRenderer,
  initCamera,
  InfoBox,
  onWindowResize,
  degreesToRadians,
  initDefaultBasicLight,
} from "../libs/util/util.js";

var stats = new Stats(); // To show FPS information
var scene = new THREE.Scene(); // Create main scene
var renderer = initRenderer(); // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, -30, 15)); // Init camera in this position

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

initDefaultBasicLight(scene);

// create the ground plane
var planeGeometry = new THREE.PlaneGeometry(20, 20);
planeGeometry.translate(0.0, 0.0, -0.02); // To avoid conflict with the axeshelper
var planeMaterial = new THREE.MeshBasicMaterial({
  color: "rgba(150, 150, 150)",
  side: THREE.DoubleSide,
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
// add the plane to the scene
scene.add(plane);

// create a cube
var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
var cubeMaterial = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// position the cube
cube.position.set(0.0, 0.0, 2.0);
// add the cube to the scene
//scene.add(cube);

var cylinderGeometry = new THREE.CylinderGeometry(0.1, 0.2, 5);
var cylinderMaterial = new THREE.MeshBasicMaterial({color: "rgb(200,200,200)"});
var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
// position the cylinder
cylinder.position.set(0.0, 0.0, 2.0);
cylinder.rotateX(degreesToRadians(90));
scene.add(cylinder);

var sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32);
var sphereMaterial = new THREE.MeshBasicMaterial( {color:'rgb(51,153,255)'} );
var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.position.set(0, 0, 4.5);
scene.add(sphere);

var rotHelper = new THREE.Object3D();
rotHelper.position.set(0, 0, 4.5);
scene.add(rotHelper);

rotHelper.rotateY(degreesToRadians(30));

var rotHelper2 = new THREE.Object3D();
rotHelper2.position.set(0, 0, 4.5);
scene.add(rotHelper2);

rotHelper2.rotateY(degreesToRadians(-30));

var cylinder2Geometry = new THREE.CylinderGeometry(0, 0.1, 2);
var cylinder2Material = new THREE.MeshBasicMaterial({color: "rgb(200,200,200)"});
var cylinder2 = new THREE.Mesh(cylinder2Geometry, cylinder2Material);
cylinder2.position.set(0.0, 0.0, 1.2);
cylinder2.rotateX(degreesToRadians(90));
sphere.add(cylinder2);

var cylinder3Geometry = new THREE.CylinderGeometry(0.1, 0, 2);
var cylinder3Material = new THREE.MeshBasicMaterial({color: "rgb(200,200,200)"});
var cylinder3 = new THREE.Mesh(cylinder3Geometry, cylinder3Material);
cylinder3.position.set(0.0, 0.0, 1.2);
cylinder3.position.set(1.2, 0 , 0);
cylinder3.rotateX(degreesToRadians(90));
cylinder3.rotateZ(degreesToRadians(90));
rotHelper.add(cylinder3);

var cylinder4Geometry = new THREE.CylinderGeometry(0, 0.1, 2);
var cylinder4Material = new THREE.MeshBasicMaterial({color: "rgb(200,200,200)"});
var cylinder4 = new THREE.Mesh(cylinder4Geometry, cylinder4Material);
cylinder4.position.set(-1.2, 0 , 0);
cylinder4.rotateX(degreesToRadians(90));
cylinder4.rotateZ(degreesToRadians(90));
rotHelper2.add(cylinder4);

// Use this to show information onscreen
var controls = new InfoBox();
controls.add("Basic Scene");
controls.addParagraph();
controls.add("Use mouse to interact:");
controls.add("* Left button to rotate");
controls.add("* Right button to translate (pan)");
controls.add("* Scroll to zoom in/out.");
controls.show();

// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer);
  },
  false
);

render();
function render() {
  sphere.rotateY(degreesToRadians(1));
  rotHelper.rotateY(degreesToRadians(1));
  rotHelper2.rotateY(degreesToRadians(1));
  stats.update(); // Update FPS
  trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera); // Render scene
}
