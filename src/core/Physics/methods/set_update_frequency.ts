import { physics_type } from '../modals';

export default function set_update_frequency(this: physics_type, freq: number) {
  this.update_frequency = freq;
  this.restart();
}
