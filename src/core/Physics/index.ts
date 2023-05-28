import _physics_world from './physics';
import * as METHODS from './methods';
import browser_bridge from '../helpers/browser_initiator';
import FireArm from './Weapon/FireArm';

const physics = { ...new _physics_world(), ...METHODS };

const Gun = new FireArm('9mm', 80, 20, 10, 100, 30, new Array(30).fill([0, 0]));

browser_bridge.addCallback('mousedown', 'FIREE', () => {
  // new Projectile(80, 100).launch(0.25, 0.05);
  Gun.startFire();
});

browser_bridge.addCallback('mouseup', 'FIREE', () => {
  // new Projectile(80, 100).launch(0.25, 0.05);
  Gun.stopFire();
});

export default physics;
