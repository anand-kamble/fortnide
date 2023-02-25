import _physics_world from './physics';
import * as METHODS from './methods';

const physics = { ...new _physics_world(), ...METHODS };

export default physics;
