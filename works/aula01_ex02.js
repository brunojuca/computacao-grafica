import * as THREE from "../build/three.module.js";
import Stats from "../build/jsm/libs/stats.module.js";
import { TrackballControls } from "../build/jsm/controls/TrackballControls.js";
import {
  initRenderer,
  initCamera,
  InfoBox,
  onWindowResize,
} from "../libs/util/util.js";

var stats = new Stats();
var scene = new THREE.Scene();
var renderer = initRenderer();
var camera = initCamera(new THREE.Vector3(0, -30, 15));

// mouse controls
var trackballControls = new TrackballControls(camera, renderer.domElement);

// axes
var axesHelper = new THREE.AxesHelper(12);
scene.add(axesHelper);

// ground plane and add it to scene

var planeGeometry = new THREE.PlaneGeometry(20, 20);
planeGeometry.translate(0.0, 0.0, -0.02);
var planeMaterial = new THREE.MeshBasicMaterial({
  color: "rgba(150, 150, 150)",
  side: THREE.DoubleSide,
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

// create sphere
var sphereGeometry = new THREE.SphereGeometry(1.5, 32, 16)
var sphereMaterial = new THREE.MeshNormalMaterial();
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

// create cube
var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
var cubeMaterial = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

//create cylinder 
var cylinderGeometry = new THREE.CylinderGeometry(2.5, 2.5, 5, 32)
var cylinderMaterial = new THREE.MeshNormalMaterial();
var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

// elements positions
sphere.position.set(-5, -5, 1.5);
cube.position.set(0.0, 0.0, 2.0);
cylinder.position.set(5, 5, 2.5);

scene.add(sphere);
scene.add(cube);
scene.add(cylinder);

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
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

render();
function render()
{
  stats.update(); // Update FPS
  trackballControls.update(); // Enable mouse movements
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}