import { Object3D } from 'three';
import animator from '../render_engine/animator';

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

  constructor() {
    this.g_acceleration = 9.80665;
    this.objects = [];
  }

  addObject(data: ObjectProperties) {
    const objectId = data.object.id;
    if (!this.objects.find(v => v.object.id === objectId)) {
      if (data.g_override === undefined) data.g_override = 0;
      if (data.water_factor === undefined) data.water_factor = 0;
      if (data.wind_factor === undefined) data.wind_factor = 0;
      this.objects.push(data);
    }
  }

  updateWorld(clock: number) {
    this.objects.forEach(obj => {
      const X = 0;
      let Y = 0;
      const Z = 0;

      if (obj.effects.includes('gravity')) Y -= this.g_acceleration * clock;

      obj.object.position.x = X;
      obj.object.position.y = Y;
      obj.object.position.z = Z;
    });
  }

  init() {
    animator.add_renderer('physics', this.updateWorld);
  }
}

const physics = new _physics();
export default physics;
