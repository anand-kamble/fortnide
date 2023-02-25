import { Box3 } from 'three';
import Log from '../../../Logger';
import { ObjectProperties, physics_type } from '../modals';

export default function addObject(this: physics_type, data: ObjectProperties) {
  try {
    /* Default parameter to be added if not supplied in argumets */
    const default_parameters = {
      'g_override': 0,
      'water_factor': 0,
      'wind_factor': 0,
      'mass': 0,
      'fixed_position': false,
      'collision': true,
    };

    const add_object_to_world = () => {
      const data_filtered = { ...default_parameters, ...data };
      /* If ground add to groud objects array */
      if (data_filtered.effects.includes('ground')) this.ground_objects.push(data_filtered.object);

      if (data_filtered.collision) {
        const bounding_box = new Box3().setFromObject(data_filtered.object);
        this.bounding_boxes.push(bounding_box);
      }

      /* Add to global objects */
      this.objects.push(data_filtered);
    };

    /* Check if the object is already added in the world. */
    const objectId = data.object.id;
    if (!this.objects.find(v => v.object.id === objectId)) {
      add_object_to_world();
    } else {
      Log.warn('CORE', `Physics > addObject\n Object with id ${objectId} already exists.`);
    }

    /* In case of first object, initialize the engine. */
    if (!this.initialized) {
      this.init();
    }
  } catch (error) {
    Log.error('PHYSICS_ENGINE', `Failed to add object ${data.object.name}`);
  }
}
