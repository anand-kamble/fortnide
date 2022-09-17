import { BoxGeometry, DirectionalLight, DoubleSide, Fog, GridHelper, HemisphereLight, Mesh, MeshPhongMaterial, PlaneGeometry } from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import animator from './animator';
const init_scene = () => {
  const light = new DirectionalLight(0xe69138, 1);
  light.castShadow = true;

  light.position.set(10, 10, 10);

  light.castShadow = true;
  light.shadow.camera.near = 0.1;
  light.shadow.camera.far = 500;
  light.shadow.camera.right = 17;
  light.shadow.camera.left = -17;
  light.shadow.camera.top = 17;
  light.shadow.camera.bottom = -17;
  light.shadow.mapSize.width = 512;
  light.shadow.mapSize.height = 512;
  light.shadow.radius = 4;
  light.shadow.bias = -0.0005;

  let gridHelper = new GridHelper(100, 100);
  {
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xb97a20; // brownish orange
    const intensity = 1;
    const light = new HemisphereLight(skyColor, groundColor, intensity);
    light.castShadow = true;
    animator.scene.add(light);
  }
  const geometry = new PlaneGeometry(100, 100, 100, 100);
  const material = new MeshPhongMaterial({ 'color': 0x858585, 'side': DoubleSide });
  const plane = new Mesh(geometry, material);
  plane.receiveShadow = true;
  plane.rotateX(degToRad(90));
  animator.scene.add(plane);

  new Array(100).fill(0).forEach((_, i) => {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshPhongMaterial({ 'color': 0xffffff });
    const cube = new Mesh(geometry, material);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.position.x = Math.random() * (i - 50);
    cube.position.z = Math.random() * (i - 50);

    animator.scene.add(cube);
  });

  animator.scene.add(light);

  animator.scene.add(gridHelper);
  animator.scene.fog = new Fog('white', 0, 100);

  animator.start_render();
};

export default init_scene;
