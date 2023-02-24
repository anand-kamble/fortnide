import { Object3D, Raycaster } from 'three';
import Log from '../../../Logger';
import global_variables from '../../helpers/global_variables';
import { physics_type } from '../modals';

export default function getGroundDistance(this: physics_type, obj: Object3D) {
  try {
    if (this.ground_objects.length) {
      const ray = new Raycaster(obj.position, global_variables.Negative_Y_axis);

      /* Uncomment the next line to visualize Raycaster */
      // animator.scene.add(new ArrowHelper(ray.ray.direction, ray.ray.origin, 300, 0xff0000));

      const result = ray.intersectObjects(this.ground_objects, false);

      return result[0]?.distance || 0;
    } else {
      return 1;
    }
  } catch (error) {
    Log.error('CORE', `[Physics] > getGroundDistance\n ${error}`);
    this.terminate();
    return 0;
  }
}
