import { Clock, Object3D, PerspectiveCamera, Scene, VSMShadowMap, WebGLRenderer } from 'three';
import global_variables from '../global_variables';

class _animator {
  scene: Scene;
  camera: PerspectiveCamera;
  scene_renderer: WebGLRenderer;
  clock: Clock;
  renderers: {
    'id': string;
    'render_function': (clock_delta: number) => void;
  }[];

  constructor() {
    this.renderers = [];
    this.clock = new Clock();
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      50,
      global_variables.get('window-dimensions').x / global_variables.get('window-dimensions').y || 1,
      0.1,
      1000
    );
    this.scene_renderer = new WebGLRenderer();
    this.scene_renderer.shadowMap.enabled = true;
    this.scene_renderer.shadowMap.type = VSMShadowMap;
    this.scene_renderer.setSize(global_variables.get('window-dimensions').x, global_variables.get('window-dimensions').y);
    document.body.appendChild(this.scene_renderer.domElement);
    global_variables.addObserver('window-dimensions', (val: { 'x': number; 'y': number }) => {
      this.scene_renderer.setSize(val.x, val.y);
      this.camera.aspect = global_variables.get('window-dimensions').x / global_variables.get('window-dimensions').y;
      this.camera.updateProjectionMatrix();
    });
  }

  add_renderer(id: string, render_function: (clock_delta: number) => void) {
    this.renderers.push({
      'id': id,
      'render_function': render_function,
    });
  }

  remove(id: string) {
    this.renderers.splice(
      this.renderers.findIndex(v => v.id === id),
      1
    );
  }

  update() {
    if (this.renderers.length) {
      const clock_delta = this.clock.getDelta();
      this.renderers.forEach(v => v.render_function(clock_delta));
    }
  }

  set_scene(scene: Scene) {
    this.scene = scene;
  }

  set_camera(camera: PerspectiveCamera) {
    this.camera = camera;
  }

  add_to_scene(object: Object3D) {
    this.scene.add(object);
  }

  start_render() {
    const frame_time = 1000 / global_variables.get('max-fps');
    setInterval(this.animate.bind(this), frame_time);
  }

  private animate() {
    requestAnimationFrame(animator.update.bind(animator));
    this.scene_renderer.render(this.scene, this.camera);
  }
}

const animator = new _animator();
export default animator;
