import { ObjectProperties, physics_type } from '../modals';

export default function addObject(this: physics_type, data: ObjectProperties) {
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
