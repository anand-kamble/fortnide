import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import global_variables from '../global_variables';
import animator from './animator';

const init = () => {
  const scene = new Scene();
  const camera = new PerspectiveCamera(120, global_variables.get('window-dimensions').x / global_variables.get('window-dimensions').y, 0.1, 1000);
  const renderer = new WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshBasicMaterial({ 'color': 0x00ff00 });
  const cube = new Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;
  const animate = () => {
    requestAnimationFrame(animator.update.bind(animator));
    renderer.render(scene, camera);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
  };
  //   animate();
  animator.add('main', animate);
  animator.update();
};

export default init;
