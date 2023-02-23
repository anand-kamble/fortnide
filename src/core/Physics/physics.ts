import { Object3D, Raycaster, Vector3 } from 'three';
import Log from '../../Logger';
import global_variables from '../helpers/global_variables';
import { animator } from '../render_engine';

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
  water_vector: Vector3;

  private update_interval_id: NodeJS.Timer | null;
  private wind_vector: Vector3;
  private ground_objects: Object3D[];
  private initialized: boolean;
  private interval_in_ms: number;
  private interval_in_seconds: number;

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

  init() {
    // this.update_interval_id = setInterval(this.updateWorld.bind(this), this.interval_in_ms);
    animator.add_renderer('physics', (clock: number) => {
      this.interval_in_seconds = clock;
      this.updateWorld();
    });
    this.initialized = true;
  }

  terminate() {
    this.update_interval_id ? clearInterval(this.update_interval_id) : null;
    animator.remove_renderer('physics');
    this.initialized = false;
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
    /* In case of first object, initialize the engine. */
    if (!this.initialized) {
      this.init();
    }
  }

  private updateWorld() {
    try {
      this.objects.forEach(obj => {
        const delta = obj.object.position.clone();
        if (obj.effects.includes('gravity') && this.getGroundDistance(obj.object) > this.interval_in_seconds * this.g_acceleration) {
          delta.setY(delta.y - this.g_acceleration * this.interval_in_seconds);
        }
        if (obj.effects.includes('wind')) {
          delta.add(this.wind_vector.multiplyScalar(this.interval_in_seconds));
        }
        if (obj.effects.includes('water')) {
          delta.add(this.water_vector.multiplyScalar(this.interval_in_seconds));
        }
        obj.object.position.x = delta.x;
        obj.object.position.y = delta.y;
        obj.object.position.z = delta.z;
      });
    } catch (error) {
      Log.error('CORE', `[Physics] > updateWorld\n ${error}`);
    }
  }

  private getGroundDistance(obj: Object3D) {
    try {
      if (this.ground_objects.length) {
        const ray = new Raycaster(obj.position, global_variables.Negative_Y_axis);
        /* Uncomment the next line to visualize Raycaster */
        // animator.scene.add(new ArrowHelper(ray.ray.direction, ray.ray.origin, 300, 0xff0000));
        const result = ray.intersectObjects(this.ground_objects, false);
        return result[0].distance || 0;
      } else {
        return 1;
      }
    } catch (error) {
      Log.error('CORE', `[Physics] > getGroundDistance\n ${error}`);
      this.terminate();
      return 0;
    }
  }
}

const physics = new _physics();
export default physics;
