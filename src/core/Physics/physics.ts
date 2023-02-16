import { Object3D, Raycaster, Vector3 } from 'three';
import global_variables from '../helpers/global_variables';

interface ObjectProperties {
  object: Object3D;
  effects: ('gravity' | 'wind' | 'water' | 'ground')[];
  g_override?: number;
  wind_factor?: number;
  water_factor?: number;
}

class _physics {
  g_acceleration: number;
  objects: ObjectProperties[];
  update_frequency: number;
  update_interval_id: number;
  water_vector: Vector3;

  private wind_vector: Vector3;
  private ground_objects: Object3D[];

  constructor() {
    this.g_acceleration = 9.80665;
    this.objects = [];
    this.ground_objects = [];
    this.wind_vector = new Vector3(0, 0, 0);
    this.water_vector = new Vector3(0, 0, 0);
  }

  init() {
    const interval_in_ms = 1000 / this.update_frequency;
    this.update_interval_id = setInterval(this.updateWorld, interval_in_ms);
  }

  terminate() {
    clearInterval(this.update_interval_id);
  }

  restart() {
    this.terminate();
    this.init();
  }

  set_update_frequency(freq: number) {
    this.update_frequency = freq;
    this.restart();
  }

  set_wind_vector(direction: Vector3) {
    this.wind_vector = direction.clone();
  }

  addObject(data: ObjectProperties) {
    const objectId = data.object.id;
    if (!this.objects.find(v => v.object.id === objectId)) {
      if (data.g_override === undefined) data.g_override = 0;
      if (data.water_factor === undefined) data.water_factor = 0;
      if (data.wind_factor === undefined) data.wind_factor = 0;
      if (data.effects.includes('ground')) this.ground_objects.push(data.object);
      this.objects.push(data);
    }
  }

  private updateWorld(clock: number) {
    this.objects.forEach(obj => {
      const delta = new Vector3(0, 0, 0);
      if (this.getGroundDistance(obj.object) > 0) {
        delta.setY(delta.y - this.g_acceleration * clock);
      }
      if (obj.effects.includes('wind')) {
        delta.add(this.wind_vector.multiplyScalar(clock));
      }
      if (obj.effects.includes('water')) {
        delta.add(this.water_vector.multiplyScalar(clock));
      }

      obj.object.position.x = delta.x;
      obj.object.position.y = delta.y;
      obj.object.position.z = delta.z;
    });
  }

  private getGroundDistance(obj: Object3D) {
    const ray = new Raycaster(obj.position, global_variables.Negative_Y_axis);
    const result = ray.intersectObjects(this.ground_objects);
    return result[0].distance;
  }
}

const physics = new _physics();
export default physics;
