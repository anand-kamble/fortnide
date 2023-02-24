import { physics_type } from '../modals';

export default function restart(this: physics_type) {
  this.terminate();
  this.init();
}
