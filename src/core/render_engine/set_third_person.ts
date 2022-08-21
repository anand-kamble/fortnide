import { AxesHelper, BufferGeometry, Camera, GridHelper, Group, Line, LineBasicMaterial, Object3D, Scene, Vector3 } from 'three';
import global_variables from '../global_variables';
import animator from './animator';

const set_third_person = (addTo: Object3D) => {
  let camera: Camera, scene: Scene, mesh: Object3D, goal: Object3D, follow: Object3D;
  let temp = new Vector3();
  let dir = new Vector3();
  let a = new Vector3();
  let b = new Vector3();
  let coronaSafetyDistance = 5;
  let velocity = 0.0;
  let speed = 0.0;

  camera = animator.camera;

  camera.position.set(0, 0.3, 0);

  scene = animator.scene;
  camera.lookAt(scene.position);

  mesh = addTo;

  goal = new Object3D();
  follow = new Object3D();
  follow.position.z = -coronaSafetyDistance;
  mesh.add(follow);

  goal.add(camera);
  scene.add(mesh);

  let gridHelper = new GridHelper(40, 40);
  scene.add(gridHelper);

  scene.add(new AxesHelper());

  const material = new LineBasicMaterial({
    'color': 0x0000ff,
  });

  const points = [];
  points.push(new Vector3(camera.position.x, camera.position.y, camera.position.z - 10));
  points.push(new Vector3(camera.position.x, camera.position.y, camera.position.z));
  points.push(new Vector3(camera.position.x, camera.position.y, camera.position.z + 10));

  const geometry = new BufferGeometry().setFromPoints(points);

  const line = new Line(geometry, material);

  const holder = new Group();
  holder.add(line);
  animator.scene.add(holder);

  animator.add_renderer('third_person_camera', () => {
    speed = 0.0;
    velocity += (speed - velocity) * 0.3;
    mesh.translateZ(velocity);
    mesh.rotateOnWorldAxis(global_variables.Y_axis, -global_variables.get('mouse-delta').x / 100);

    // mesh.rotateY(-global_variables.get('mouse-delta').x / 100);
    // mesh.rotateX(global_variables.get('mouse-delta').y / 100);
    a.lerp(mesh.position, 0.4);
    b.copy(goal.position);

    dir.copy(a).sub(b).normalize();
    const dis = a.distanceTo(b) - coronaSafetyDistance;
    goal.position.addScaledVector(dir, dis);
    goal.position.lerp(temp, 0.2);
    temp.setFromMatrixPosition(follow.matrixWorld);

    camera.lookAt(mesh.position);
    line.geometry.attributes.position.needsUpdate = true;
    // camera.getWorldPosition(holder.position);
    camera.getWorldQuaternion(holder.quaternion);
  });
};

export default set_third_person;
