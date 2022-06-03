import * as THREE from "../build/three.module.js";
import Stats from "../build/jsm/libs/stats.module.js";
import { GUI } from "../build/jsm/libs/dat.gui.module.js";
import { TrackballControls } from "../build/jsm/controls/TrackballControls.js";
import KeyboardState from "../libs/util/KeyboardState.js";
import { TeapotGeometry } from "../build/jsm/geometries/TeapotGeometry.js";
import {
  initRenderer,
  InfoBox,
  SecondaryBox,
  createGroundPlane,
  onWindowResize,
  degreesToRadians,
} from "../libs/util/util.js";

var scene = new THREE.Scene(); // Create main scene
var stats = new Stats(); // To show FPS information

var renderer = initRenderer(); // View function in util/utils
renderer.setClearColor("rgb(30, 30, 42)");
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.lookAt(0, 0, 0);
camera.position.set(2.2, 2.5, 4.0);
camera.up.set(0, 1, 0);
var objColor = "rgb(210,210,210)";
var objShininess = 200;

// To use the keyboard
var keyboard = new KeyboardState();

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls(camera, renderer.domElement);

// Listen window size changes
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer);
  },
  false
);

var groundPlane = createGroundPlane(6.0, 6.0, 50, 50); // width and height
groundPlane.rotateX(degreesToRadians(-90));
scene.add(groundPlane);

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper(1.5);
axesHelper.visible = false;
scene.add(axesHelper);

// Show text information onscreen
showInformation();

var infoBox = new SecondaryBox("");

// Teapot
var geometry = new TeapotGeometry(0.5);
var material = new THREE.MeshPhongMaterial({
  color: objColor,
  shininess: "200",
});
material.side = THREE.DoubleSide;
var obj = new THREE.Mesh(geometry, material);
obj.castShadow = true;
obj.position.set(0.0, 0.5, 0.0);
scene.add(obj);

const torusRadius = 1.4;
const torusHeight = 1.5;
var torusGeometry = new THREE.TorusGeometry(torusRadius, 0.02, 20, 50);
var torusMaterial = new THREE.MeshBasicMaterial({ color: "rgb(70,30,30)" });
var torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.position.set(0.0, torusHeight, 0.0);
torus.rotateX(degreesToRadians(90));
scene.add(torus);

//----------------------------------------------------------------------------
//----------------------------------------------------------------------------
// Control available light and set the active light
var lightIntensity = 1.0;

//---------------------------------------------------------
// Default light position, color, ambient color and intensity
var lightPosition = new THREE.Vector3(0, torusHeight, -torusRadius);
var lightColor = "rgb(255,0,0)";
var ambientColor = "rgb(30,30,30)";

var lightHelper = new THREE.Object3D();
scene.add(lightHelper);

// Sphere to represent the light

var lightSphere = createSphere(
  lightHelper,
  0.05,
  10,
  10,
  lightPosition,
  lightColor
);

//---------------------------------------------------------
// Create and set all lights. Only Spot and ambient will be visible at first
var spotLight = new THREE.SpotLight(lightColor);
setSpotLight(spotLight, lightPosition, lightHelper);

// Light 2

var light2Position = new THREE.Vector3(torusRadius, torusHeight, 0);
var light2Color = "rgb(0,0,255)";

var light2Helper = new THREE.Object3D();
scene.add(light2Helper);

var light2Sphere = createSphere(
  light2Helper,
  0.05,
  10,
  10,
  light2Position,
  light2Color
);

var spotLight2 = new THREE.SpotLight(light2Color);
setSpotLight(spotLight2, light2Position, light2Helper);

// Light 3

var light3Position = new THREE.Vector3(0, torusHeight, torusRadius);
var light3Color = "rgb(0,255,0)";

var light3Helper = new THREE.Object3D();
scene.add(light3Helper);

var light3Sphere = createSphere(
  light3Helper,
  0.05,
  10,
  10,
  light3Position,
  light3Color
);

var spotLight3 = new THREE.SpotLight(light3Color);
setSpotLight(spotLight3, light3Position, light3Helper);

// More info here: https://threejs.org/docs/#api/en/lights/AmbientLight
var ambientLight = new THREE.AmbientLight(ambientColor);
scene.add(ambientLight);

buildInterface();
render();

function createSphere(
  parentElement,
  radius,
  widthSegments,
  heightSegments,
  position,
  color
) {
  var geometry = new THREE.SphereGeometry(
    radius,
    widthSegments,
    heightSegments,
    0,
    Math.PI * 2,
    0,
    Math.PI
  );
  var material = new THREE.MeshBasicMaterial({ color: color });
  var object = new THREE.Mesh(geometry, material);
  object.visible = true;
  object.position.copy(position);
  parentElement.add(object);

  return object;
}

// Set Spotlight
// More info here: https://threejs.org/docs/#api/en/lights/SpotLight
function setSpotLight(light, position, parentElement) {
  light.position.copy(position);
  light.shadow.mapSize.width = 512;
  light.shadow.mapSize.height = 512;
  light.angle = degreesToRadians(40);
  light.castShadow = true;
  light.decay = 2;
  light.penumbra = 1;
  light.name = "Spot Light";

  parentElement.add(light);
}

// Update light intensity of the current light
function updateLightIntensity() {
  spotLight.intensity = lightIntensity;
  spotLight2.intensity = lightIntensity;
  spotLight3.intensity = lightIntensity;
}

function buildInterface() {
  //------------------------------------------------------------
  // Interface
  var controls = new (function () {
    this.viewAxes = false;
    this.color = objColor;
    this.shininess = objShininess;
    this.lightIntensity = lightIntensity;
    this.lightType = "Spot";
    this.ambientLight = true;

    this.onViewAxes = function () {
      axesHelper.visible = this.viewAxes;
    };
    this.onEnableAmbientLight = function () {
      ambientLight.visible = this.ambientLight;
    };
    this.updateColor = function () {
      material.color.set(this.color);
    };
    this.onUpdateShininess = function () {
      material.shininess = this.shininess;
    };
    this.onUpdateLightIntensity = function () {
      lightIntensity = this.lightIntensity;
      updateLightIntensity();
    };
  })();

  var gui = new GUI();
  gui
    .addColor(controls, "color")
    .name("Obj Color")
    .onChange(function (e) {
      controls.updateColor();
    });
  gui
    .add(controls, "shininess", 0, 1000)
    .name("Obj Shininess")
    .onChange(function (e) {
      controls.onUpdateShininess();
    });
  gui
    .add(controls, "viewAxes", false)
    .name("View Axes")
    .onChange(function (e) {
      controls.onViewAxes();
    });
  gui
    .add(controls, "lightIntensity", 0, 5)
    .name("Light Intensity")
    .onChange(function (e) {
      controls.onUpdateLightIntensity();
    });
  gui
    .add(controls, "ambientLight", true)
    .name("Ambient Light")
    .onChange(function (e) {
      controls.onEnableAmbientLight();
    });
}

function keyboardUpdate() {
  const angularVelocity = 2;
  keyboard.update();
  if (keyboard.pressed("Q")) {
    lightHelper.rotateY(degreesToRadians(-angularVelocity));
  }
  if (keyboard.pressed("E")) {
    lightHelper.rotateY(degreesToRadians(angularVelocity));
  }
  if (keyboard.down("W")) {
    lightHelper.visible = !lightHelper.visible;
  }
  if (keyboard.pressed("A")) {
    light2Helper.rotateY(degreesToRadians(-angularVelocity));
  }
  if (keyboard.pressed("D")) {
    light2Helper.rotateY(degreesToRadians(angularVelocity));
  }
  if (keyboard.down("S")) {
    light2Helper.visible = !light2Helper.visible;
  }
  if (keyboard.pressed("Z")) {
    light3Helper.rotateY(degreesToRadians(-angularVelocity));
  }
  if (keyboard.pressed("C")) {
    light3Helper.rotateY(degreesToRadians(angularVelocity));
  }
  if (keyboard.down("X")) {
    light3Helper.visible = !light3Helper.visible;
  }
}

function showInformation() {
  // Use this to show information onscreen
  var controls = new InfoBox();
  controls.add("Exercício - Iluminação");
  controls.addParagraph();
  controls.add("Q e E giram a luz vermelha. W a desliga.");
  controls.addParagraph();
  controls.add("A e D giram a luz azul. S a desliga.");
  controls.addParagraph();
  controls.add("Z e C giram a luz verde. X a desliga.");
  controls.show();
}

function render() {
  stats.update();
  trackballControls.update();
  keyboardUpdate();
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
