import { Object3D, Vector3 } from 'three';
import { ObjectProperties } from './modals';

class _physics {
  g_acceleration: number;
  objects: ObjectProperties[];
  update_frequency: number;
  water_vector: Vector3;
  update_interval_id: NodeJS.Timer | null;
  wind_vector: Vector3;
  ground_objects: Object3D[];
  initialized: boolean;
  interval_in_ms: number;
  interval_in_seconds: number;

  constructor() {
    this.g_acceleration = 9.80665;
    this.objects = [];
    this.ground_objects = [];
    this.wind_vector = new Vector3(0, 0, 0);
    this.water_vector = new Vector3(0, 0, 0);
    this.initialized = false;
    this.update_interval_id = null;
    this.update_frequency = 50;
    this.interval_in_ms = 1000 / this.update_frequency;
    this.interval_in_seconds = 1 / this.update_frequency;
  }
}

export default _physics;
