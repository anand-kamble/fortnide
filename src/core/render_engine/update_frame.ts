//@ts-nocheck

/* 

    THIS FILE CONTAINS CODE THAT MIGHT BE TRASH.

*/

// import { WebGLRenderer } from 'three';
// import global_variables from '../global_variables';
// import animator from './animator';

// // //   animate();
// // animator.add('main', animate);
// // animator.update();

// class _update_frame {
//   scene: any;
//   camera: any;
//   renderer: any;
//   constructor() {
//     this.scene = null;
//     this.camera = null;
//     this.renderer = new WebGLRenderer();
//     this.renderer.setSize(global_variables.get('window-dimensions').x, global_variables.get('window-dimensions').y);
//     document.body.appendChild(this.renderer.domElement);
//   }

//   set_scene(scene: any) {
//     this.scene = scene;
//   }

//   set_camera(camera: any) {
//     this.camera = camera;
//   }

//   start_render() {
//     const frame_time = 1000 / global_variables.get('max-fps');
//     setInterval(this.animate.bind(this), frame_time);
//   }

//   private animate() {
//     requestAnimationFrame(animator.update.bind(animator));
//     this.renderer.render(this.scene, this.camera);
//   }
// }

// const update_frame = new _update_frame();

// export default update_frame;

// import * as THREE from 'three';

// var camera: any, scene: any, renderer: any, mesh: any, goal: any, keys: { [k: string]: boolean }, follow: any;

// // var time = 0;
// // var newPosition = new THREE.Vector3();
// // var matrix = new THREE.Matrix4();

// // var stop = 1;
// // var DEGTORAD = 0.01745327;
// var temp = new THREE.Vector3();
// var dir = new THREE.Vector3();
// var a = new THREE.Vector3();
// var b = new THREE.Vector3();
// var coronaSafetyDistance = 0.3;
// var velocity = 0.0;
// var speed = 0.0;

// init();
// animate();

// function init() {
//   camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
//   camera.position.set(0, 0.3, 0);

//   scene = new THREE.Scene();
//   camera.lookAt(scene.position);

//   var geometry = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
//   var material = new THREE.MeshNormalMaterial();

//   mesh = new THREE.Mesh(geometry, material);

//   goal = new THREE.Object3D();
//   follow = new THREE.Object3D();
//   follow.position.z = -coronaSafetyDistance;
//   mesh.add(follow);

//   goal.add(camera);
//   scene.add(mesh);

//   var gridHelper = new THREE.GridHelper(40, 40);
//   scene.add(gridHelper);

//   scene.add(new THREE.AxesHelper());

//   renderer = new THREE.WebGLRenderer({ 'antialias': true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);

//   keys = {
//     'a': false,
//     's': false,
//     'd': false,
//     'w': false,
//   };

//   document.body.addEventListener('keydown', function (e) {
//     const key = e.code.replace('Key', '').toLowerCase();
//     if (keys[key] !== undefined) keys[key] = true;
//   });
//   document.body.addEventListener('keyup', function (e) {
//     const key = e.code.replace('Key', '').toLowerCase();
//     if (keys[key] !== undefined) keys[key] = false;
//   });
// }

// function animate() {
//   requestAnimationFrame(animate);

//   speed = 0.0;

//   if (keys.w) speed = 0.01;
//   else if (keys.s) speed = -0.01;

//   velocity += (speed - velocity) * 0.3;
//   mesh.translateZ(velocity);

//   if (keys.a) mesh.rotateY(0.05);
//   else if (keys.d) mesh.rotateY(-0.05);

//   a.lerp(mesh.position, 0.4);
//   b.copy(goal.position);

//   dir.copy(a).sub(b).normalize();
//   const dis = a.distanceTo(b) - coronaSafetyDistance;
//   goal.position.addScaledVector(dir, dis);
//   goal.position.lerp(temp, 0.02);
//   temp.setFromMatrixPosition(follow.matrixWorld);

//   camera.lookAt(mesh.position);

//   renderer.render(scene, camera);
// }

export {};

// import * as THREE from "https://cdn.skypack.dev/three@0.132.1/build/three.module.js";
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.132.1/examples/jsm/controls/OrbitControls.js";

// const WIDTH = window.innerWidth;
// const HEIGHT = window.innerHeight;

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, WIDTH / HEIGHT, 0.1, 1000 );
// camera.position.set( 2, 5, 10 );

// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize( WIDTH, HEIGHT );
// document.body.appendChild( renderer.domElement );

// const controls = new OrbitControls( camera, renderer.domElement );

// //

// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

// // LINE

// const points = [];
// points.push( new THREE.Vector3( -5, 3, 0 ) );
// points.push( new THREE.Vector3( 5, 3, 0 ) );

// const geometry = new THREE.BufferGeometry().setFromPoints( points );

// const line = new THREE.Line(
//   geometry,
//   new THREE.LineBasicMaterial({ color: 0xff00ff })
// );

// scene.add( line );

// // PLANE

// const mesh = new THREE.Mesh(
// 	new THREE.PlaneGeometry( 5, 5 ),
//   new THREE.MeshNormalMaterial({ side: THREE.DoubleSide })
// );

// scene.add( mesh );

// //

// THREE.Object3D.prototype.rotateAroundWorldAxis = function() {

//     // rotate object around axis in world space (the axis passes through point)
//     // axis is assumed to be normalized
//     // assumes object does not have a rotated parent

//     var q = new THREE.Quaternion();

//     return function rotateAroundWorldAxis( point, axis, angle ) {

//         q.setFromAxisAngle( axis, angle );

//         this.applyQuaternion( q );

//         this.position.sub( point );
//         this.position.applyQuaternion( q );
//         this.position.add( point );

//         return this;

//     }

// }();

// function rotateAroundAxis() {

// 	if ( !mesh ) return

//   const vecA = points[0];
//   const vecB = points[1];
//   const vec = new THREE.Vector3();

//   vec.copy( vecA ).sub( vecB ).normalize();

//   mesh.rotateAroundWorldAxis( vecA, vec, 0.1 );

// }

// //

// function animate() {
//   requestAnimationFrame( animate );
//   rotateAroundAxis();
//   renderer.render( scene, camera );
// };

// animate();

// import * as THREE from 'https://cdn.skypack.dev/three@0.133.1';
// import { OrbitControls } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.133.1/examples/jsm/loaders/GLTFLoader.js';

// // Scene and renderer
// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xa0a0a0);
// scene.fog = new THREE.Fog(0xa0a0a0, 10, 50);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.outputEncoding = THREE.sRGBEncoding;
// renderer.shadowMap.enabled = true;
// document.body.appendChild(renderer.domElement);

// // Lights
// const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
// hemiLight.position.set(0, 20, 0);
// scene.add(hemiLight);

// const dirLight = new THREE.DirectionalLight(0xffffff);
// dirLight.position.set(3, 10, 10);
// dirLight.castShadow = true;
// dirLight.shadow.camera.top = 2;
// dirLight.shadow.camera.bottom = -2;
// dirLight.shadow.camera.left = -2;
// dirLight.shadow.camera.right = 2;
// dirLight.shadow.camera.near = 0.1;
// dirLight.shadow.camera.far = 40;
// scene.add(dirLight);

// // Ground plane
// const mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
// mesh.rotation.x = -Math.PI / 2;
// mesh.receiveShadow = true;
// scene.add(mesh);
// const gridHelper = new THREE.GridHelper(100, 100);
// scene.add(gridHelper);

// // Container for both camera and person
// const container = new THREE.Group();
// scene.add(container);

// // Camera and controls
// const xAxis = new THREE.Vector3(1, 0, 0);
// const tempCameraVector = new THREE.Vector3();
// const ss = new THREE.Vector3();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
// camera.position.set(0, 2, -1);
// const cameraOrigin = new THREE.Vector3(0, 1.5, 0);
// camera.lookAt(cameraOrigin);
// container.add(camera);

// // Model and animation actions
// let model,
//   skeleton,
//   mixer,
//   clock,
//   numAnimations = 0,
//   movingForward = false,
//   mousedown = false;
// clock = new THREE.Clock();
// const allActions = [];
// const baseActions = {
//   idle: { weight: 1 },
//   walk: { weight: 0 },
//   run: { weight: 0 },
// };
// function setWeight(action, weight) {
//   action.enabled = true;
//   action.setEffectiveTimeScale(1);
//   action.setEffectiveWeight(weight);
// }
// function activateAction(action) {
//   const clip = action.getClip();
//   const settings = baseActions[clip.name];
//   setWeight(action, settings.weight);
//   action.play();
// }

// const loader = new GLTFLoader();
// loader.load('https://threejs.org/examples/models/gltf/Xbot.glb', function (gltf) {
//   model = gltf.scene;
//   container.add(model);
//   model.traverse(function (object) {
//     if (object.isMesh) {
//       object.castShadow = true;
//     }
//   });

//   skeleton = new THREE.SkeletonHelper(model);
//   skeleton.visible = false;
//   container.add(skeleton);
//   const animations = gltf.animations;
//   mixer = new THREE.AnimationMixer(model);

//   let a = animations.length;
//   for (let i = 0; i < a; ++i) {
//     let clip = animations[i];
//     const name = clip.name;
//     if (baseActions[name]) {
//       const action = mixer.clipAction(clip);
//       activateAction(action);
//       baseActions[name].action = action;
//       allActions.push(action);
//       numAnimations += 1;
//     }
//   }
// });

// const animate = function () {
//   requestAnimationFrame(animate);
//   for (let i = 0; i < numAnimations; i++) {
//     const action = allActions[i];
//     const clip = action.getClip();
//     const settings = baseActions[clip.name];
//     // settings.weight = action.getEffectiveWeight();
//   }

//   if (mixer) {
//     const mixerUpdateDelta = clock.getDelta();
//     mixer.update(mixerUpdateDelta);
//   }

//   if (movingForward) {
//     // Get the X-Z plane in which camera is looking to move the player
//     camera.getWorldDirection(tempCameraVector);
//     const cameraDirection = tempCameraVector.setY(0).normalize();

//     // Get the X-Z plane in which player is looking to compare with camera
//     model.getWorldDirection(tempModelVector);
//     const playerDirection = tempModelVector.setY(0).normalize();

//     // Get the angle to x-axis. z component is used to compare if the angle is clockwise or anticlockwise since angleTo returns a positive value
//     const cameraAngle = cameraDirection.angleTo(xAxis) * (cameraDirection.z > 0 ? 1 : -1);
//     const playerAngle = playerDirection.angleTo(xAxis) * (playerDirection.z > 0 ? 1 : -1);

//     // Get the angle to rotate the player to face the camera. Clockwise positive
//     const angleToRotate = playerAngle - cameraAngle;

//     // Get the shortest angle from clockwise angle to ensure the player always rotates the shortest angle
//     let sanitisedAngle = angleToRotate;
//     if (angleToRotate > Math.PI) {
//       sanitisedAngle = angleToRotate - 2 * Math.PI;
//     }
//     if (angleToRotate < -Math.PI) {
//       sanitisedAngle = angleToRotate + 2 * Math.PI;
//     }

//     // Rotate the model by a tiny value towards the camera direction
//     model.rotateY(Math.max(-0.05, Math.min(sanitisedAngle, 0.05)));
//     container.position.add(cameraDirection.multiplyScalar(0.05));
//     camera.lookAt(container.position.clone().add(cameraOrigin));
//   }

//   renderer.render(scene, camera);
// };

// animate();

// // Key and mouse events
// window.addEventListener('keydown', e => {
//   const { keyCode } = e;
//   if (keyCode === 87 || keyCode === 38) {
//     baseActions.idle.weight = 0;
//     baseActions.run.weight = 5;
//     activateAction(baseActions.run.action);
//     activateAction(baseActions.idle.action);
//     movingForward = true;
//   }
// });

// window.addEventListener('keyup', e => {
//   const { keyCode } = e;
//   if (keyCode === 87 || keyCode === 38) {
//     baseActions.idle.weight = 1;
//     baseActions.run.weight = 0;
//     activateAction(baseActions.run.action);
//     activateAction(baseActions.idle.action);
//     movingForward = false;
//   }
// });

// window.addEventListener('pointerdown', e => {
//   mousedown = true;
// });

// window.addEventListener('pointerup', e => {
//   mousedown = false;
// });

// window.addEventListener('pointermove', e => {
//   if (mousedown) {
//     const { movementX, movementY } = e;
//     const offset = new THREE.Spherical().setFromVector3(camera.position.clone().sub(cameraOrigin));
//     const phi = offset.phi - movementY * 0.02;
//     offset.theta -= movementX * 0.02;
//     offset.phi = Math.max(0.01, Math.min(0.35 * Math.PI, phi));
//     camera.position.copy(cameraOrigin.clone().add(new THREE.Vector3().setFromSpherical(offset)));
//     camera.lookAt(container.position.clone().add(cameraOrigin));
//   }
// });
