import animator from './animator';
import glft_data from '../media/models/walking.glb';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Clock, Color, GridHelper, Group, Matrix4, PointLight, Scene, Vector3 } from 'three';
import global_variables from '../global_variables';
import { radian_from_degree } from '../helpers';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const player_group_object = () => {
  const loader = new GLTFLoader();
  const player_group = new Group();
  loader.load(glft_data, function (gltf) {
    gltf.scene.rotateX(radian_from_degree(90));
    player_group.add(gltf.scene);
    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object
  });

  const control = new OrbitControls(animator.camera, animator.scene_renderer.domElement);
  control.maxDistance = 5;
  control.target = player_group.position;

  const light = new PointLight(0xff0000, 1, 100);
  light.position.set(3, -3, 3);
  player_group.add(light);

  animator.camera.position.z = 5;
  animator.camera.rotateX(radian_from_degree(-45));
  animator.scene.add(player_group);
  animator.camera.rotateX(radian_from_degree(45));

  animator.add_renderer('player_group', () => {
    animator.camera.lookAt(player_group.position);
  });
};
export default player_group_object;
