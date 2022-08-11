import { BoxGeometry, MeshBasicMaterial, Mesh, PlaneGeometry, DoubleSide } from 'three';
import animator from './animator';

const init_scene = () => {
  animator.start_render();
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ 'color': 0x00ff00 });
  const cube = new Mesh(geometry, material);
  animator.scene.add(cube);
  const geometryp = new PlaneGeometry(3, 3);
  const materialp = new MeshBasicMaterial({ 'color': 0xffff00, 'side': DoubleSide });
  const plane = new Mesh(geometryp, materialp);

  animator.scene.add(plane);

  animator.camera.position.z = 5;
};

export default init_scene;
