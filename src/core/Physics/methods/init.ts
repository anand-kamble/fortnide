import { physics_type } from '../modals';

export default function init(this: physics_type) {
  this.update_interval_id = setInterval(this.updateWorld.bind(this), this.interval_in_ms);
  // animator.add_renderer('physics', () => {
  // this.updateWorld();
  // });
  this.initialized = true;
}
