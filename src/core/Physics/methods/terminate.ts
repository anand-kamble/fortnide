import { animator } from '../../render_engine';
import { physics_type } from '../modals';

export default function terminate(this: physics_type) {
  this.update_interval_id ? clearInterval(this.update_interval_id) : null;
  animator.remove_renderer('physics');
  this.initialized = false;
}
