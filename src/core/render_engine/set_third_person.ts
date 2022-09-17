import { Camera, Group, Object3D, Scene, Spherical, Vector3 } from 'three';
import global_variables from '../global_variables';
// import { radian_from_degree } from '../helpers';
import animator from './animator';

const set_third_person = (addTo: Object3D) => {
  var camera: Camera, scene: Scene, mesh: Object3D, goal: Object3D, follow: Object3D;

  camera = animator.camera;

  camera.position.set(0, 3, -3);

  scene = animator.scene;

  mesh = addTo;

  goal = new Object3D();
  follow = new Object3D();
  mesh.add(follow);

  goal.add(camera);
  scene.add(mesh);

  const container = new Group();
  container.add(camera);
  scene.add(container);
  animator.add_renderer('third_person_camera', clock => {
    const cameraOrigin = new Vector3(addTo.position.x, addTo.position.y, addTo.position.z);
    camera.lookAt(cameraOrigin);
    const { movementX, movementY } = { 'movementX': global_variables.get('mouse-delta').x, 'movementY': global_variables.get('mouse-delta').y };
    const offset = new Spherical().setFromVector3(camera.position.clone().sub(cameraOrigin));
    offset.radius = 5;
    const phi = offset.phi - movementY * global_variables.get('mouse-sensitivity') * clock;
    const theta = movementX * global_variables.get('mouse-sensitivity') * clock;
    offset.theta -= theta;
    offset.phi = Math.max(phi, 0.1);
    camera.position.copy(cameraOrigin.clone().add(new Vector3().setFromSpherical(offset)));
    camera.lookAt(container.position.clone().add(cameraOrigin));
  });
};

export default set_third_person;
