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

import * as THREE from 'three';

var camera: any, scene: any, renderer: any, mesh: any, goal: any, keys: { [k: string]: boolean }, follow: any;

// var time = 0;
// var newPosition = new THREE.Vector3();
// var matrix = new THREE.Matrix4();

// var stop = 1;
// var DEGTORAD = 0.01745327;
var temp = new THREE.Vector3();
var dir = new THREE.Vector3();
var a = new THREE.Vector3();
var b = new THREE.Vector3();
var coronaSafetyDistance = 0.3;
var velocity = 0.0;
var speed = 0.0;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
  camera.position.set(0, 0.3, 0);

  scene = new THREE.Scene();
  camera.lookAt(scene.position);

  var geometry = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
  var material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);

  goal = new THREE.Object3D();
  follow = new THREE.Object3D();
  follow.position.z = -coronaSafetyDistance;
  mesh.add(follow);

  goal.add(camera);
  scene.add(mesh);

  var gridHelper = new THREE.GridHelper(40, 40);
  scene.add(gridHelper);

  scene.add(new THREE.AxesHelper());

  renderer = new THREE.WebGLRenderer({ 'antialias': true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  keys = {
    'a': false,
    's': false,
    'd': false,
    'w': false,
  };

  document.body.addEventListener('keydown', function (e) {
    const key = e.code.replace('Key', '').toLowerCase();
    if (keys[key] !== undefined) keys[key] = true;
  });
  document.body.addEventListener('keyup', function (e) {
    const key = e.code.replace('Key', '').toLowerCase();
    if (keys[key] !== undefined) keys[key] = false;
  });
}

function animate() {
  requestAnimationFrame(animate);

  speed = 0.0;

  if (keys.w) speed = 0.01;
  else if (keys.s) speed = -0.01;

  velocity += (speed - velocity) * 0.3;
  mesh.translateZ(velocity);

  if (keys.a) mesh.rotateY(0.05);
  else if (keys.d) mesh.rotateY(-0.05);

  a.lerp(mesh.position, 0.4);
  b.copy(goal.position);

  dir.copy(a).sub(b).normalize();
  const dis = a.distanceTo(b) - coronaSafetyDistance;
  goal.position.addScaledVector(dir, dis);
  goal.position.lerp(temp, 0.02);
  temp.setFromMatrixPosition(follow.matrixWorld);

  camera.lookAt(mesh.position);

  renderer.render(scene, camera);
}

export {};
