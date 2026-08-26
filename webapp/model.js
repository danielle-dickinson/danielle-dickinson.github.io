// This web app was developed by Will Armstrong
// http://armstrongwill.com/
// will@armstrongwill.com
// October 2013

// The web app was modified by Dan Milisavljevic
// https://www.cfa.harvard.edu/~dmilisav/
// dmilisav@cfa.harvard.edu
// December 2014

// The web app uses data published in the following papers:
// Milisavljevic, D., & Fesen, R. A. 2013, ApJ, 772, 134 (optical)
// DeLaney, T., et al. 2010, ApJ, 725, 2038 (X-ray)
// Milisavljevic, D., & Fesen, R. A. 2015 (near-infrared)

// Please cite the above papers if you use this web app for your
// own research purposes. 

// Also used in this web app is an image of Cassiopeia A retrieved
// from the website www.spacetelescope.org. The original observations
// for this image were made with the NASA/ESA Hubble Space Telescope,
// and obtained from the data archive at the Space Telescope Science
// Institute. The data were associated with GO 10286 (PI:
// R. Fesen). STScI is operated by the Association of Universities for
// Research in Astronomy, Inc. under NASA contract NAS 5-26555.

var camera, scene, renderer;
var controls;
var pivot;

var SCALE = 0.05;

var shellSystem;
// var knots1System;
// var knots2System;
var HighVKnotsSystem;
var ironSystem;
var interiorSystem;
var tranSphere;
var imageMesh;
var vectorSystem1;
var OIVSystem;
var SIVSystem;
var NeIISystem;
var SiIISystem;
var ArIISystem;


var shellOn = true;
// var knots1On = false;
// var knots2On = false;
var HighVKnotsOn = false;
var interiorOn = false;
var ironOn = false;
var tranSphereOn = true;
var imageOn = false;
var vectorOn = false;

var OIVOn = false;
var SIVOn = false;
var NeIIOn = false;
var SiIIOn = false;
var ArIIOn = false;


var rotate = false;
var ydeg = 0;

init();
animate();

/*
function init()
Initializes the renderer, camera, scene, components of the model, and controls.
*/

function init() {

	if (Detector.webgl) {
		renderer = new THREE.WebGLRenderer();	
	} else {
		Detector.addGetWebGLMessage();
	}

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0x000000, 1);
	renderer.sortObjects = false;
	document.body.appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = -700;

	//creates components of model
	shellSystem = addModel(Shell, 2, 4, 0xFF0000);
	// knots1System = addModel(Knots1, 1, 2, 0xFFFF00);
	// knots2System = addModel(Knots2, 1, 2, 0xFFFF00);
	HighVKnotsSystem = addModel(HighVKnots, 1, 2, 0xFFFF00);

	ironSystem = addModel(Iron, 4, 8, 0x6666FF);
    interiorSystem = addModel(Interior, 2, 6, 0x00FF00);
	OIVSystem = addModel(OIV, 2, 6, 0xFF8C00);
	SIVSystem = addModel(SIV, 2, 6, 0xFF1493);
	NeIISystem = addModel(NeII, 2, 6, 0x2E8B57);
	SiIISystem = addModel(SiII, 2, 6, 0xEE82EE);
	ArIISystem = addModel(ArII, 2, 6, 0xFFD700);

	// vectorSystem1 = addLines(Knots1);
	// vectorSystem2 = addLines(Knots2);

	vectorSystem1 = addLines(HighVKnots);

	var imageGeometry = new THREE.PlaneGeometry(1100,750);
	var imageMaterial = new THREE.MeshBasicMaterial({color: 0xFFFFFF, map: THREE.ImageUtils.loadTexture("casa-webb-web.jpg")});
	imageMesh = new THREE.Mesh(imageGeometry, imageMaterial);
	imageMesh.material.side = THREE.DoubleSide;
	imageMesh.position.x = 0;
	imageMesh.position.y = 0;

	var sphereMaterial = new THREE.MeshBasicMaterial({color: 0xAAAAAA, transparent: true, opacity: 0.5});
	var sphereGeometry = new THREE.SphereGeometry(4400 * SCALE, 40, 40);
	tranSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	tranSphere.position.x = -600 * SCALE;
	tranSphere.position.y =  200 * SCALE;
	tranSphere.position.z =  760 * SCALE;

	//so everything rotates together
	pivot = new THREE.Object3D();
	pivot.add(shellSystem);
	pivot.add(tranSphere);

	scene = new THREE.Scene();
	scene.add(camera);
	scene.add(pivot);

	controls = new THREE.TrackballControls(camera);
	controls.noPan = true;
	controls.minDistance = 100;
	controls.maxDistance = 1500;
	controls.domElement = document.body;

	window.addEventListener( 'resize', onWindowResize, false );

}

/*
function addModel(coords, shift, size, color)

Return a new particle system.  Particles are added around each of the x,y,z coordinates specified in coords to give a ball like effect.  This is done via a circle of particles every 30 degrees in each of the xy, xz, and yz planes.  Note that the coordinates are scaled using the constant SCALE.

coords - The x,y,z coordinates for the center points of each ball in the form [[x0,y0,z0], [x1,y1,z1] ...] 

shift - the radius of the added circles of particles.

size - the size of the particles. 

color - the color of the particles using a hex color code. For example, 0xFF0000 is red.

*/

function addModel(coords, shift, size, color) {
	
	//modified from http://threejs.org/examples/webgl_buffergeometry_particles.html
	
	var geometry = new THREE.BufferGeometry();

	var particles = coords.length * 37;
	geometry.attributes = {
		position: {
			itemSize: 3,
			array: new Float32Array(particles * 3)
		}
	}
	
	var positions = geometry.attributes.position.array;
	var count = 0;

	for (var i = 0; i < coords.length; i++) {
		var x = coords[i][0] * SCALE;
		var y = coords[i][1] * SCALE;
		var z = coords[i][2] * SCALE;
		var points = [[x, y, z], [x + shift, y, z], [x - shift, y, z], [x, y + shift, z], [x, y - shift, z], [x, y, z + shift], [x, y, z - shift]];
		var a = Math.sqrt(3)/2;
		var b = 0.5;
		var cpoints = [[a * shift , b * shift], [b * shift, a * shift], [-b * shift , a * shift], [-a * shift, b * shift], [-a * shift, -b * shift], [-b * shift, -a * shift], [b * shift, -a * shift], [a * shift, -b * shift]];

		for (var j = 0; j < points.length; j++) {
			positions[count] = points[j][0];
			positions[count + 1] = points[j][1];
			positions[count + 2] = points[j][2];
			count += 3;
		}
		for (var j = 0; j < cpoints.length; j++) {
			positions[count] = x + cpoints[j][0];
			positions[count + 1] = y + cpoints[j][1];
			positions[count + 2] = z;
			count += 3;
		}
		for (var j = 0; j < cpoints.length; j++) {
			positions[count] = x + cpoints[j][0];
			positions[count + 1] = y;
			positions[count + 2] = z + cpoints[j][1];
			count += 3;
		}
		for (var j = 0; j < cpoints.length; j++) {
			positions[count] = x;
			positions[count + 1] = y + cpoints[j][0];
			positions[count + 2] = z + cpoints[j][1];
			count += 3;
		}
	}

	geometry.computeBoundingSphere();
	
	var material = new THREE.ParticleBasicMaterial({color: color, size: size, depthWrite: true, depthTest: true, fog: false, transparent: true, opacity: 0.7});
	material.alphaTest = 0.7;
	return new THREE.ParticleSystem(geometry, material);

}

/*
function addLines(coords)

return a new THREE.Line object with starting points at the origin and endpoints specified in the coords array. 

coords - the x,y,z coordinates for the endpoints of each line in the form [[x0,y0,z0], [x1,y1,z1] ...] 
*/

function addLines(coords) {
	
	//modified from http://threejs.org/examples/webgl_buffergeometry_particles.html
	
	var geometry = new THREE.BufferGeometry();
	var endpoints = coords.length * 2;
	geometry.attributes = {
		position: {
			itemSize: 3,
			array: new Float32Array(endpoints * 3)
		}
	}
	
	var positions = geometry.attributes.position.array;
	var count = 0;

	for (var i = 0; i < coords.length; i++) {
		var x = coords[i][0] * SCALE;
		var y = coords[i][1] * SCALE;
		var z = coords[i][2] * SCALE;
		positions[count] = 0;
		positions[count + 1] = 0;
		positions[count + 2] = 0;
		positions[count + 3] = x;
		positions[count + 4] = y;
		positions[count + 5] = z;
		count += 6;
	}

	geometry.computeBoundingSphere();
	return new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xFFFF00}), THREE.LinePieces);

}

/*
function toggleImage()

Toggle the image plane when the 'Image' button is pushed.
*/

function toggleImage() {

	if (imageOn) {
		imageOn = false;
	} else {
		imageOn = true;
	}
	reset();

}

/*
function toggleIron()

Toggle the Iron component when the 'Iron' button is pushed.
*/

function toggleIron() {

	if (ironOn) {
		ironOn = false;	
	} else {
		ironOn = true;
	}
	reset();

}

/*
function toggleInterior()

Toggle the Interior component when the 'Interior' button is pushed.
*/

function toggleInterior() {

	if (interiorOn) {
		interiorOn = false;	
	} else {
		interiorOn = true;
	}
	reset();

}

/*
function toggleOIV()

Toggle the Oxygen IV component when the 'OIV' button is pushed.

*/

function toggleOIV() {

	if (OIVOn) {
		OIVOn = false;
	} else {
		OIVOn = true;
	}
	reset();

}

/*
function toggleSIV()

Toggle the Sulfur IV component when the 'SIV' button is pushed.
*/

function toggleSIV() {

	if (SIVOn) {
		SIVOn = false;
	} else {
		SIVOn = true;
	}
	reset();

}

/*
function toggleNeII()

Toggle the Neon II component when the 'NeII' button is pushed.
*/

function toggleNeII() {
	
	if (NeIIOn) {
		NeIIOn = false;
	} else {
		NeIIOn = true;
	}
	reset();

}

/*
function toggleSiII()

Toggle the Silicon II component when the 'SiII' button is pushed.
*/

function toggleSiII() {

	if (SiIIOn) {
		SiIIOn = false;
	} else {
		SiIIOn = true;
	}
	reset();

}

/*
function toggleArII()

Toggle the Argon II component when the 'ArII' button is pushed.
*/

function toggleArII() {

	if (ArIIOn) {
		ArIIOn = false;
	} else {
		ArIIOn = true;
	}
	reset();

}

/*
function toggleShell()

Toggle the Shell component when the 'Shell' button is pushed.
*/

function toggleShell() {

	if (shellOn) {
		shellOn = false;
	} else {
		shellOn = true;
	}
	reset();	

}

/*
function toggleKnots()

Toggle the Knots component when the 'High Velocity Knots' button is pushed.
*/

// function toggleKnots() {

// 	if (knots2On) {
// 		knots2On = false;
// 		knots1On = false;
// 	} else {
// 		knots2On = true;
// 		knots1On = true;
// 	}
// 	reset();	

// }

function toggleHighVKnots() {

	if (HighVKnotsOn) {
		HighVKnotsOn = false;
	} else {
		HighVKnotsOn = true;
	}
	reset();

}


/*
function toggleSphere()

Toggle the Sphere component when the 'Sphere' button is pushed.
*/

function toggleSphere() {

	if (tranSphereOn) {
		tranSphereOn = false;
	} else {
		tranSphereOn = true;
	}
	reset();

}


/*
function toggleRotate()

Toggle Rotation when the 'Rotate' button is pushed.
*/

function toggleRotate() {

	if (rotate) {
		rotate = false;
	} else {
		rotate = true;
	}

}

/*
function toggleVectors()

Toggle the Vectors component when the 'High Velocity Vectors' button is pushed.
*/

function toggleVectors() {

	if (vectorOn) {
		vectorOn = false;
	} else {
		vectorOn = true;
	}
	reset();

}


/*
function reset()

This is a helper function to fix transparency issues when a component is toggled on or off. 
This is done so that the renderer has a chance to redraw transparent objects correctly.
*/

function reset() {

	scene.remove(pivot);
	renderer.render(scene, camera);
	pivot = new THREE.Object3D();
	
	if (vectorOn) {
		pivot.add(vectorSystem1);
	}
	if (imageOn) {
		pivot.add(imageMesh);
	}
	if (ironOn) {
		pivot.add(ironSystem);
	}
	if (interiorOn) {
		pivot.add(interiorSystem);
	}
	if (shellOn) {
		pivot.add(shellSystem);
	}

	if (OIVOn) {
		pivot.add(OIVSystem);
	}
	if (SIVOn) {
		pivot.add(SIVSystem);
	}
	if (NeIIOn) {
		pivot.add(NeIISystem);
	}
	if (SiIIOn) {
		pivot.add(SiIISystem);
	}
	if (ArIIOn) {
		pivot.add(ArIISystem);
	}


	// if (knots1On) {
	// 	pivot.add(knots1System);
	// }
	if (HighVKnotsOn) {
		pivot.add(HighVKnotsSystem);
	}
	// if (knots2On) {
	// 	pivot.add(knots2System);
	
	// }
	if (tranSphereOn) {
		pivot.add(tranSphere);
	}
	pivot.rotation.y = THREE.Math.degToRad(ydeg);
	scene.add(pivot);

}

/*
function onWindowResize()

Recalibration is done here whenever the window is resized.
*/

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);

}

/*
function animate()

This is the run loop which animates the scene, updates controls and rotates the model as required.
*/

function animate() {

	if (rotate) {
		ydeg += 0.1;
		if (ydeg == 360) {
			ydeg = 0;
		}
		pivot.rotation.y = THREE.Math.degToRad(ydeg);
	}

	requestAnimationFrame(animate);
	controls.update(1);
	renderer.render(scene, camera);

}
