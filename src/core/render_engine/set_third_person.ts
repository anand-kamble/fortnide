import { AxesHelper, BufferGeometry, Camera, GridHelper, Group, Line, LineBasicMaterial, Object3D, Scene, Vector3 } from 'three';
import global_variables from '../global_variables';
// import { radian_from_degree } from '../helpers';
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

  const material2 = new LineBasicMaterial({
    'color': 0xff0000,
  });

  const points: Vector3[] = [];
  points.push(new Vector3(addTo.position.x, addTo.position.y, addTo.position.z - 10));
  points.push(new Vector3(addTo.position.x, addTo.position.y, addTo.position.z));
  points.push(new Vector3(addTo.position.x, addTo.position.y, addTo.position.z + 10));

  const points2: Vector3[] = [];
  points2.push(new Vector3(addTo.position.x - 10, addTo.position.y, addTo.position.z));
  points2.push(new Vector3(addTo.position.x, addTo.position.y, addTo.position.z));
  points2.push(new Vector3(addTo.position.x + 10, addTo.position.y, addTo.position.z));

  const geometry = new BufferGeometry().setFromPoints(points);
  const geometry2 = new BufferGeometry().setFromPoints(points2);
  const line = new Line(geometry, material);
  const line2 = new Line(geometry2, material2);
  const holder = new Group();
  holder.add(line);
  // line2.rotation.set(0, radian_from_degree(90), 0);
  // line2.rotateY(radian_from_degree(90));
  line2.position.set(addTo.position.x, 0, addTo.position.z);

  holder.add(line2);
  animator.scene.add(holder);
  animator.add_renderer('third_person_camera', () => {
    // line2.rotateY(radian_from_degree(90));
    speed = 0.0;
    velocity += (speed - velocity) * 0.3;
    mesh.translateZ(velocity);

    mesh.rotateOnWorldAxis(global_variables.Y_axis, -global_variables.get('mouse-delta').x / 100);

    line2.geometry.attributes.position.needsUpdate = true;

    const vec = new Vector3();
    const vecA = new Vector3(
      line2.geometry.attributes.position.array[0],
      line2.geometry.attributes.position.array[1],
      line2.geometry.attributes.position.array[2]
    );
    const vecB = new Vector3(
      line2.geometry.attributes.position.array[6],
      line2.geometry.attributes.position.array[7],
      line2.geometry.attributes.position.array[8]
    );
    vec.copy(vecA).sub(vecB).normalize();

    mesh.rotateOnWorldAxis(vec, -global_variables.get('mouse-delta').y / 100);

    a.lerp(mesh.position, 0.4);
    b.copy(goal.position);
    dir.copy(a).sub(b).normalize();
    const dis = a.distanceTo(b) - coronaSafetyDistance;
    goal.position.addScaledVector(dir, dis);
    goal.position.lerp(temp, 0.9);
    temp.setFromMatrixPosition(follow.matrixWorld);
    camera.lookAt(mesh.position);
    camera.getWorldQuaternion(holder.quaternion);
  });
};

export default set_third_person;
