import * as THREE from  '../build/three.module.js';
import Stats from       '../build/jsm/libs/stats.module.js';
import {GUI} from       '../build/jsm/libs/dat.gui.module.js';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {TeapotGeometry} from '../build/jsm/geometries/TeapotGeometry.js';
import {initRenderer, 
        createGroundPlane,
        createLightSphere,        
        onWindowResize, 
        degreesToRadians,
        initDefaultBasicLight} from "../libs/util/util.js";

var scene = new THREE.Scene();    // Create main scene
var stats = new Stats();          // To show FPS information  var renderer = initRenderer();    // View function in util/utils
var renderer = initRenderer();    // View function in util/utils
  renderer.setClearColor("rgb(30, 30, 42)");

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.lookAt(0, 0, 0);
  camera.position.set(2.5, 2.0, 4.5);
  camera.up.set( 0, 1, 0 );

var ambientLight = new THREE.AmbientLight("rgb(100, 100, 100)");
scene.add(ambientLight);

initDefaultBasicLight(scene);

var lightPosition = new THREE.Vector3(2.5, 1.8, 0.0);
  var light = new THREE.SpotLight(0xffffff);
  light.position.copy(lightPosition);
  light.castShadow = true;
  light.penumbra = 0.5;    
//scene.add(light);

//var lightSphere = createLightSphere(scene, 0.1, 10, 10, lightPosition);  

// Set angles of rotation
var angle = 0;
var speed = 0.01;
var animationOn = false; // control if animation is on or of

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls( camera, renderer.domElement );

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 1.5 );
  axesHelper.visible = false;
scene.add( axesHelper );

//-- Scene Objects -----------------------------------------------------------
// Ground
var groundPlane = createGroundPlane(5.0, 5.0, 100, 100); // width and height
  groundPlane.rotateX(degreesToRadians(-90));
//scene.add(groundPlane);


// Cube
var cubeSize = 1;
var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
var cubeMaterial = new THREE.MeshLambertMaterial();
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;
  cube.position.set(0.0, cubeSize/2, 1.0);
//scene.add(cube);

// side 1
var cylinderGeometry = new THREE.CylinderGeometry(cubeSize/2, cubeSize/2, cubeSize*2, 32, 32, true);
var cylinderMaterial = new THREE.MeshLambertMaterial({side:THREE.DoubleSide});
var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
scene.add(cylinder);

var circleGeometry = new THREE.CircleGeometry(cubeSize/2, 32);
var circleMaterial = new THREE.MeshLambertMaterial({side:THREE.DoubleSide});
var circle = new THREE.Mesh(circleGeometry, circleMaterial);
circle.rotateX(degreesToRadians(90));
circle.position.set(0, cubeSize, 0);
scene.add(circle);

var circle2 = new THREE.Mesh(circleGeometry, circleMaterial);
circle2.rotateX(degreesToRadians(90));
circle2.position.set(0, -cubeSize, 0);
scene.add(circle2);


//----------------------------------------------------------------------------
//-- Use TextureLoader to load texture files
var textureLoader = new THREE.TextureLoader();
var floor  = textureLoader.load('../assets/textures/floor-wood.jpg');
var glass  = textureLoader.load('../assets/textures/glass.png');
var stone = textureLoader.load('../assets/textures/stone.jpg');
var sun = textureLoader.load('../assets/textures/sun.jpg');
var wood = textureLoader.load('../assets/textures/wood.png');
var woodtop = textureLoader.load('../assets/textures/woodtop.png');


// Apply texture to the 'map' property of the respective materials' objects
groundPlane.material.map = floor;
cube.material.map = stone;
cylinder.material.map = wood;
circle.material.map = woodtop;
circle2.material.map = woodtop;


render();



function render()
{
  stats.update();
  trackballControls.update();
  requestAnimationFrame(render);
  renderer.render(scene, camera)
}
