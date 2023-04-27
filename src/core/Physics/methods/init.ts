import { animator } from '../../render_engine';
import { physics_type } from '../modals';

export default function init(this: physics_type) {
  /* Physics world is also updated with each frame render */
  animator.add_renderer('physics', this.updateWorld.bind(this));
  this.initialized = true;
}
