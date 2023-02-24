import { physics_type } from './modals';
import _physics from './physics';
import * as METHODS from './methods';

const physics = { ...(new _physics() as physics_type), ...METHODS };

export default physics;
