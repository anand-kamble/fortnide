import { AxesHelper, Camera, GridHelper, Object3D, Scene, Vector3 } from 'three';
import global_variables from '../global_variables';
import animator from './animator';

const set_third_person = (addTo: Object3D) => {
  // let  mesh: Object3D, goal: Object3D, follow: Object3D;
  const temp = new Vector3();
  const dir = new Vector3();
  const a = new Vector3();
  const b = new Vector3();
  const coronaSafetyDistance = 5;
  let velocity = 0.0;
  let speed = 0.0;

  const camera: Camera = animator.camera;

  camera.position.set(0, 0.3, 0);

  const scene: Scene = animator.scene;
  camera.lookAt(scene.position);

  const mesh: Object3D = addTo;

  const goal: Object3D = new Object3D();
  const follow: Object3D = new Object3D();
  follow.position.z = -coronaSafetyDistance;
  mesh.add(follow);

  goal.add(camera);
  scene.add(mesh);

  const gridHelper = new GridHelper(40, 40);
  scene.add(gridHelper);

  scene.add(new AxesHelper());

  animator.add_renderer('third_person_camera', () => {
    speed = 0.0;
    velocity += (speed - velocity) * 0.3;
    mesh.translateZ(velocity);
    mesh.rotateY(-global_variables.get('mouse-delta').x / 100);
    mesh.rotateX(global_variables.get('mouse-delta').y / 100);

    a.lerp(mesh.position, 0.4);
    b.copy(goal.position);

    dir.copy(a).sub(b).normalize();
    const dis = a.distanceTo(b) - coronaSafetyDistance;
    goal.position.addScaledVector(dir, dis);
    goal.position.lerp(temp, 0.2);
    temp.setFromMatrixPosition(follow.matrixWorld);

    camera.lookAt(mesh.position);
  });
};

export default set_third_person;
