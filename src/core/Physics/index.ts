import _physics_world from './physics';
import * as METHODS from './methods';
import Projectile from './Projectile';
import browser_bridge from '../helpers/browser_initiator';

const physics = { ...new _physics_world(), ...METHODS };

browser_bridge.addCallback('mousedown', 'FIREE', () => {
  new Projectile(80, 100).launch(0.05, 0.05);
});

export default physics;
