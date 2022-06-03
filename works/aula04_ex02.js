import * as THREE from  '../build/three.module.js';
import Stats from       '../build/jsm/libs/stats.module.js';
import {GUI} from       '../build/jsm/libs/dat.gui.module.js';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import {initRenderer, 
        initCamera, 
        degreesToRadians, 
        onWindowResize,
        initDefaultBasicLight,
        createGroundPlane} from "../libs/util/util.js";

var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var camera = initCamera(new THREE.Vector3(5, 5, 7)); // Init camera in this position
var trackballControls = new TrackballControls( camera, renderer.domElement );
initDefaultBasicLight(scene);

const BASE_SPEED = 0.005;
var speed = 0.02;
var sphereRadius = 1;
var [x, y ,z] = [0, sphereRadius, 0];
var [newX, newY ,newZ] = [0, sphereRadius, 0];
var [dX, dY ,dZ] = [0, 0, 0];
var moving = false; // control if animation is on or of

var plane = createGroundPlane(25, 25);
plane.rotateX(degreesToRadians(-90));
scene.add(plane);

// Base sphere
var sphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
var sphereMaterial = new THREE.MeshPhongMaterial( {color:'rgb(255,0,0)'} );
var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
sphere.position.set(x, y, z);
scene.add(sphere);

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

buildInterface();
render();

function ballUpdate()
{

  // Set angle's animation speed
  if(moving)
  {
    x+=dX*speed
    y+= dY*speed
    z+=dZ*speed
    sphere.position.set(x, y, z)
    console.log("moving");
    if ( Math.abs(x - newX) < 0.1 && Math.abs(y - newY) < 0.1 && Math.abs(z - newZ) < 0.1) moving = false;
  }
}

function buildInterface()
{
  var controls = new function ()
  {
    this.onChangeAnimation = function(){
      dX = newX - x;
      dY = newY - y;
      dZ = newZ - z;
      moving = !moving;
      console.log("delta", dX, dY, dZ);
    };
    this.speed = 0;
    this.newX = 0;
    this.newY = sphereRadius;
    this.newZ = 0;

    this.changeSpeed = function(){
      speed = this.speed*BASE_SPEED;
    };

    this.changePosition = function() {
      newX = this.newX;
      this.newY > sphereRadius ? newY = this.newY : newY = sphereRadius;
      newZ = this.newZ;
      console.log(newX, newY, newZ);
    }
  };

  // GUI interface
  var gui = new GUI();
  gui.add(controls, 'newX', -12, 12)
  .onChange(function(e) { controls.changePosition() })
  .name("X");
  gui.add(controls, 'newY', sphereRadius, 20)
  .onChange(function(e) { controls.changePosition() })
  .name("Y");
  gui.add(controls, 'newZ', -12, 12)
  .onChange(function(e) { controls.changePosition() })
  .name("Z");
  // gui.add(controls, 'speed', 1, 10)
  // .onChange(function(e) { controls.changeSpeed() })
  // .name("Speed");
  gui.add(controls, 'onChangeAnimation',true).name("Mover");
}

function render()
{
  stats.update(); // Update FPS
  trackballControls.update();
  ballUpdate();
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}
