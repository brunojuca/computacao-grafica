import * as THREE from  '../libs/other/three.module.r82.js';
import {RaytracingRenderer} from  '../libs/other/raytracingRenderer.js';
import {degreesToRadians} from "../libs/util/util.js";

var scene, renderer;

var container = document.createElement( 'div' );
document.body.appendChild( container );

var scene = new THREE.Scene();

// The canvas is in the XY plane.
// Hint: put the camera in the positive side of the Z axis and the
// objects in the negative side
var camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 2.5;
camera.position.y = 2.5;

// light
var intensity = 0.5;
var light = new THREE.PointLight( 0xffffff, intensity );
light.position.set( 0, 2.50, 0 );
scene.add( light );

var light = new THREE.PointLight( 0x55aaff, intensity );
light.position.set( -1.00, 1.50, 2.00 );
scene.add( light );

var light = new THREE.PointLight( 0xffffff, intensity );
light.position.set( 1.00, 1.50, 2.00 );
scene.add( light );

renderer = new RaytracingRenderer(window.innerWidth, window.innerHeight, 32, camera);
container.appendChild( renderer.domElement );

// materials
var phongMaterialBox = new THREE.MeshLambertMaterial( {
	color: "rgb(255,255,255)",
} );

var phongMaterialBox2 = new THREE.MeshLambertMaterial( {
	color: "rgb(138, 196, 255)",
} );

var phongMaterialBoxBottom = new THREE.MeshLambertMaterial( {
	color: "rgb(180,180,180)",
} );

var phongMaterialBoxLeft = new THREE.MeshLambertMaterial( {
	color: "rgb(51, 153, 255)",
} );

var phongMaterialBoxRight = new THREE.MeshLambertMaterial( {
	color: "rgb(51, 153, 255)",
} );

var phongMaterial = new THREE.MeshPhongMaterial( {
	color: "rgb(150,190,220)",
	specular: "rgb(255,255,255)",
	shininess: 1000,
	} );

var phongMaterialRed = new THREE.MeshPhongMaterial( {
	color: "rgb(200,0,0)",
	specular: "rgb(255,255,255)",
	shininess: 1000,
	} );


var mirrorMaterial = new THREE.MeshPhongMaterial( {
	color: "rgb(0,0,0)",
	specular: "rgb(255,255,255)",
	shininess: 1000,
} );
mirrorMaterial.mirror = true;
mirrorMaterial.reflectivity = 1;

var mirrorMaterialDark = new THREE.MeshPhongMaterial( {
	color: "rgb(0,0,0)",
	specular: "rgb(170,170,170)",
	shininess: 10000,
} );
mirrorMaterialDark.mirror = true;
mirrorMaterialDark.reflectivity = 1;

var mirrorMaterialSmooth = new THREE.MeshPhongMaterial( {
	color: "rgb(255,170,0)",
	specular: "rgb(34,34,34)",
	shininess: 10000,
} );
mirrorMaterialSmooth.mirror = true;
mirrorMaterialSmooth.reflectivity = 0.1;

var glassMaterialSmooth = new THREE.MeshPhongMaterial( {
	color: "rgb(0,0,0)",
	specular: "rgb(255,255,255)",
	shininess: 10000,
} );
glassMaterialSmooth.glass = true;
glassMaterialSmooth.reflectivity = 0.25;
glassMaterialSmooth.refractionRatio = 1.5;

// geometries
var sphereGeometry = new THREE.SphereGeometry( 1, 24, 24 );
var planeGeometry = new THREE.BoxGeometry( 6.00, 0.05, 3.00 );
var sidePlaneGeometry = new THREE.BoxGeometry( 3.00, 0.05, 3.00 );
var backMirrorGeometry = new THREE.BoxGeometry( 4.50, 0.05, 3.00 );
var boxGeometry = new THREE.BoxGeometry( 1.00, 1.00, 1.00 );
var cylinderGeometry = new THREE.CylinderGeometry(1/2, 1/2, 1, 32, 32);
var cylinderGeometry2 = new THREE.CylinderGeometry(0.8/2, 0.4/2, 0.8, 32, 32);
var torusGeometry = new THREE.TorusKnotGeometry(0.25, 0.1);

// Cylinder
var cylinder = new THREE.Mesh( cylinderGeometry, phongMaterialBox2 );
cylinder.position.set( -0, 1.5, -2.5 );

var sphere = new THREE.Mesh( sphereGeometry, mirrorMaterial );
sphere.scale.multiplyScalar( 0.4 );
cylinder.add(sphere);
sphere.position.set(0, 0.9, 0);

scene.add(cylinder);

// Cylinder
var cylinder2 = new THREE.Mesh( cylinderGeometry, phongMaterialBox2 );
cylinder2.position.set( -1.5, 1.5, -2.0 );

var torus = new THREE.Mesh( torusGeometry, mirrorMaterialSmooth );
cylinder2.add(torus);
torus.position.set(0, 0.95, 0);

scene.add(cylinder2);

// Cylinder
var cylinder3 = new THREE.Mesh( cylinderGeometry, phongMaterialBox2 );
cylinder3.position.set( 1.5, 1.5, -2.0 );

var cyl = new THREE.Mesh( cylinderGeometry2, phongMaterialRed );
cylinder3.add(cyl);
cyl.position.set(0, 0.9, 0);

scene.add(cylinder3);



// Sphere
var sphere = new THREE.Mesh( sphereGeometry, phongMaterial );
sphere.scale.multiplyScalar( 0.5 );
sphere.position.set( -0.5, 0, -0.75 );
//scene.add( sphere );

// Mirror Sphere
var sphere2 = new THREE.Mesh( sphereGeometry, mirrorMaterialSmooth );
sphere2.scale.multiplyScalar( 0.8 );
sphere2.position.set( 1.75, .30, -1.50 );
//scene.add( sphere2 );

// Glass Sphere (black-right-front)
var glass = new THREE.Mesh( sphereGeometry, glassMaterialSmooth );
glass.scale.multiplyScalar( 0.5 );
glass.position.set( 1.20, 0, -.50 );
glass.rotation.y = 0.6;
//scene.add( glass );

// Box
var box = new THREE.Mesh( boxGeometry, mirrorMaterial );
box.position.set( -1.75, 0, -1.90 );
box.rotation.y = degreesToRadians(37);
//scene.add( box );

// Back Mirror
// var backmirror = new THREE.Mesh( backMirrorGeometry, mirrorMaterialDark );
// backmirror.rotation.x = 1.57;
// backmirror.position.set( 0, 1.50, -2.90 );
// backmirror.scale.multiplyScalar( 0.95 );
// scene.add( backmirror );

// bottom
var plane = new THREE.Mesh( planeGeometry, phongMaterialBoxBottom );
plane.position.set( 0, 1, -3.00 );
scene.add( plane );

// top
var plane = new THREE.Mesh( planeGeometry, phongMaterialBox );
plane.position.set( 0, 4, -3.00 );
scene.add( plane );

// back
var plane = new THREE.Mesh( planeGeometry, phongMaterialBox );
plane.rotation.x = 1.57;
plane.position.set( 0, 2.50, -3.00 );
scene.add( plane );

// left
var plane = new THREE.Mesh( sidePlaneGeometry, phongMaterialBoxLeft );
plane.rotation.z = 1.57;
plane.position.set( -3.00, 2.50, -3.00 )
plane.rotateY(degreesToRadians(90));
scene.add( plane );

// right
var plane = new THREE.Mesh( sidePlaneGeometry, phongMaterialBoxRight );
plane.rotation.z = 1.57;
plane.position.set( 3.00, 2.50, -3.00 )
plane.rotateY(degreesToRadians(90));
scene.add( plane );

render();

function render()
{
	renderer.render( scene, camera );
}
