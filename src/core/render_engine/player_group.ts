import animator from './animator';
import glft_data from '../media/models/walking.glb';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { BoxBufferGeometry, Group, Mesh, MeshNormalMaterial, PointLight } from 'three';
import { radian_from_degree } from '../helpers';
import set_third_person from './set_third_person';

const player_group_object = () => {
  const loader = new GLTFLoader();
  const player_group = new Group();
  loader.load(glft_data, function (gltf) {
    gltf.scene.rotateX(radian_from_degree(90));
    player_group.add(gltf.scene);
    gltf.animations; // Array<AnimationClip>
    gltf.scene; // Group
    gltf.scenes; // Array<Group>
    gltf.cameras; // Array<Camera>
    gltf.asset; // Object
  });

  // Created a point around which the camera will revolve.
  const geometry = new BoxBufferGeometry(0.2, 0.2, 0.2);
  const material = new MeshNormalMaterial();
  const revolve_point = new Mesh(geometry, material);
  revolve_point.position.y = 1.6;
  revolve_point.position.x = -0.2;

  // Set the third person camera to follow the point.
  set_third_person(revolve_point);

  const light = new PointLight(0xff0000, 1, 100);
  light.position.set(3, -3, 3);
  player_group.add(light);
  player_group.rotateX(radian_from_degree(-90));

  animator.scene.add(player_group);
};
export default player_group_object;
