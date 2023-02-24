import { Vector3 } from 'three';
import { physics_type } from '../modals';

export default function set_wind_vector(this: physics_type, direction: Vector3) {
  this.wind_vector = direction.clone();
}
