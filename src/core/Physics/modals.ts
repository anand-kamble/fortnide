import { Object3D } from 'three';
import physics from '.';

export interface ObjectProperties {
  [x: string]: ObjectProperties[keyof ObjectProperties];
  object: Object3D;
  effects: ('gravity' | 'wind' | 'water' | 'ground')[];
  g_override?: number;
  wind_factor?: number;
  water_factor?: number;
  mass?: number;
  fixed_position?: boolean;
  collision?: boolean;
}

export type physics_type = typeof physics;
