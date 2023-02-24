import { Object3D } from 'three';
import * as METHODS from './methods';
import _physics from './physics';

export interface ObjectProperties {
  object: Object3D;
  effects: ('gravity' | 'wind' | 'water' | 'ground')[];
  g_override?: number;
  wind_factor?: number;
  water_factor?: number;
  mass?: number;
  fixed_position?: boolean;
}

export type physics_type = _physics & typeof METHODS;
