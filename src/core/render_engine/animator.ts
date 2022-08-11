import { Scene, WebGLRenderer } from 'three';
import global_variables from '../global_variables';

class _animator {
  scene: Scene | null;
  camera: any;
  scene_renderer: WebGLRenderer;
  renderers: {
    'id': string;
    'render_function': Function;
  }[];

  constructor() {
    this.renderers = [];
    this.scene = null;
    this.camera = null;
    this.scene_renderer = new WebGLRenderer();
    this.scene_renderer.setSize(global_variables.get('window-dimensions').x, global_variables.get('window-dimensions').y);
    document.body.appendChild(this.scene_renderer.domElement);
    const scope = this;
    global_variables.addObserver('window-dimensions', (val: { 'x': number; 'y': number }) => {
      this.scene_renderer.setSize(val.x, val.y);
    });
  }

  add(id: string, render_function: Function) {
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

  update(time: number) {
    if (this.renderers.length) this.renderers.forEach(v => v.render_function());
  }

  set_scene(scene: any) {
    this.scene = scene;
  }

  set_camera(camera: any) {
    this.camera = camera;
  }

  start_render() {
    const frame_time = 1000 / global_variables.get('max-fps');
    setInterval(this.animate.bind(this), frame_time);
  }

  private animate() {
    requestAnimationFrame(animator.update.bind(animator));
    if (this.scene) this.scene_renderer.render(this.scene, this.camera);
  }
}

const animator = new _animator();
export default animator;
