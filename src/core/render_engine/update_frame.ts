// import { WebGLRenderer } from 'three';
// import global_variables from '../global_variables';
// import animator from './animator';

// // //   animate();
// // animator.add('main', animate);
// // animator.update();

// class _update_frame {
//   scene: any;
//   camera: any;
//   renderer: any;
//   constructor() {
//     this.scene = null;
//     this.camera = null;
//     this.renderer = new WebGLRenderer();
//     this.renderer.setSize(global_variables.get('window-dimensions').x, global_variables.get('window-dimensions').y);
//     document.body.appendChild(this.renderer.domElement);
//   }

//   set_scene(scene: any) {
//     this.scene = scene;
//   }

//   set_camera(camera: any) {
//     this.camera = camera;
//   }

//   start_render() {
//     const frame_time = 1000 / global_variables.get('max-fps');
//     setInterval(this.animate.bind(this), frame_time);
//   }

//   private animate() {
//     requestAnimationFrame(animator.update.bind(animator));
//     this.renderer.render(this.scene, this.camera);
//   }
// }

// const update_frame = new _update_frame();

// export default update_frame;
export {};
