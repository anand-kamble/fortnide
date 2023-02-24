import Log from '../../../Logger';
import { physics_type } from '../modals';

export default function updateWorld(this: physics_type) {
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
      obj.object.position.set(delta.x, delta.y, delta.z);
    });
  } catch (error) {
    Log.error('CORE', `[Physics] > updateWorld\n ${error}`);
  }
}
