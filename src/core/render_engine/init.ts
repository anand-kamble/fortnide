import {
  BoxGeometry,
  DirectionalLight,
  DoubleSide,
  Fog,
  GridHelper,
  HemisphereLight,
  Mesh,
  MeshPhongMaterial,
  PlaneGeometry,
  ShaderMaterial,
} from 'three';
import { degToRad } from 'three/src/math/MathUtils';
import animator from './animator';
import f_shader from '../shaders/test_box/f_shader.glsl';
import v_shader from '../shaders/test_box/v_shader.glsl';
import { importShader } from '../helpers';

const init_scene = async () => {
  let time = 0.0;
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

  const gridHelper = new GridHelper(100, 100);
  {
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xb97a20; // brownish orange
    const intensity = 1;
    const light = new HemisphereLight(skyColor, groundColor, intensity);
    animator.scene.add(light);
  }
  const geometry = new PlaneGeometry(100, 100, 100, 100);
  const material = new MeshPhongMaterial({ 'color': 0x858585, 'side': DoubleSide });
  const plane = new Mesh(geometry, material);
  plane.receiveShadow = true;
  plane.rotateX(degToRad(90));
  animator.scene.add(plane);

  // new Array(100).fill(0).forEach((_, i) => {
  //   const geometry = new BoxGeometry(1, 1, 1);
  //   const material = new MeshPhongMaterial({ 'color': 0xffffff });
  //   const cube = new Mesh(geometry, material);
  //   cube.castShadow = true;
  //   cube.receiveShadow = true;
  //   cube.position.x = Math.random() * (i - 50);
  //   cube.position.z = Math.random() * (i - 50);

  //   animator.scene.add(cube);
  // });

  const fragment = await importShader(f_shader);
  const vertex = await importShader(v_shader);
  const box_geometry = new BoxGeometry(20, 20, 20, 10, 10, 10);
  const box_material = new ShaderMaterial({
    'vertexShader': vertex,
    'fragmentShader': fragment,
    'wireframe': false,
    'uniforms': {
      'time': { 'value': time },
    },
    'side': DoubleSide,
  });

  const cube = new Mesh(box_geometry, box_material);
  cube.position.x = 0;
  cube.position.y = 1;
  // animator.scene.add(cube);
  animator.scene.add(light);
  animator.scene.add(gridHelper);
  animator.scene.fog = new Fog('white', 0, 100);

  animator.start_render();
  animator.add_renderer('timeShader', clock_delta => {
    time += clock_delta;
    box_material.uniforms.time.value = time;
  });
};

export default init_scene;
