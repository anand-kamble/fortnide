import { Scene, PerspectiveCamera, BoxGeometry, MeshBasicMaterial, Mesh, PlaneGeometry, DoubleSide } from 'three';
import global_variables from '../global_variables';
import animator from './animator';

const init_scene = () => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(120, global_variables.get('window-dimensions').x / global_variables.get('window-dimensions').y, 0.1, 1000);

  animator.set_scene(scene);
  animator.set_camera(camera);
  animator.start_render();
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ 'color': 0x00ff00 });
  const cube = new Mesh(geometry, material);
  scene.add(cube);
  const geometryp = new PlaneGeometry(3, 3);
  const materialp = new MeshBasicMaterial({ 'color': 0xffff00, 'side': DoubleSide });
  const plane = new Mesh(geometryp, materialp);

  scene.add(plane);

  camera.position.z = 5;
};

export default init_scene;
