import { BoxGeometry, MeshBasicMaterial, Mesh, PlaneGeometry, DoubleSide, SphereGeometry, TextureLoader } from 'three';
import animator from './animator';
import sky_texture from '../media/images/sky.jpg';
const init_scene = () => {
  const geometry = new SphereGeometry(15, 32, 16);
  // const material = new MeshBasicMaterial({ 'color': 0xffff00 });
  const texture = new TextureLoader().load(sky_texture);
  const material = new MeshBasicMaterial({ 'map': texture, 'side': DoubleSide });
  const sphere = new Mesh(geometry, material);
  animator.scene.add(sphere);

  const geometry_plane = new PlaneGeometry(10, 10);
  const material_plane = new MeshBasicMaterial({ 'color': 0xffff00, 'side': DoubleSide });
  const plane = new Mesh(geometry_plane, material_plane);
  animator.scene.add(plane);

  animator.start_render();
};

export default init_scene;
