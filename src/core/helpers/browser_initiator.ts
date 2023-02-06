import global_variables from './global_variables';
import Log from '../../Logger/index';

type Listeners = 'mousemove' | 'resize' | 'click';
type cbStructure = { id: string; cb: (e: MouseEvent | UIEvent) => void };
class _browser_bridge {
  mousemove: cbStructure[];
  resize: cbStructure[];
  click: cbStructure[];
  constructor() {
    this.mousemove = [];
    this.resize = [];
    this.click = [];
    this.addListeners();
  }

  addCallback(callbackFor: Listeners, id: string, callback: cbStructure['cb']) {
    try {
      this[callbackFor].push({ 'id': id, 'cb': callback });
    } catch (error) {
      Log.warn('CORE', `[browser_bridge] : Failed to add callback with id : ${id}`);
    }
  }

  removeCallback(callbackFor: Listeners, id: string) {
    try {
      let indexOfCallback = -1;
      this[callbackFor].forEach((cb, i) => {
        if (cb.id === id) {
          indexOfCallback = i;
        }
      });
      if (indexOfCallback > -1) {
        this[callbackFor].splice(indexOfCallback, 1);
      }
    } catch (error) {
      Log.warn('CORE', `[browser_bridge] : Failed to remove callback with id : ${id}`);
    }
  }

  addListeners() {
    const typesOfListener = Object.keys(this) as unknown as Array<Listeners>;
    typesOfListener.forEach(type => {
      window.addEventListener(type, e => {
        this[type].map(v => {
          v.cb(e);
        });
      });
    });
  }
}
const browser_bridge = new _browser_bridge();

const brower_initiator = () => {
  document.documentElement.setAttribute('lang', navigator.language);
  global_variables.set('window-dimensions', { 'x': window.innerWidth, 'y': window.innerHeight });

  // Adding event listener for window size change.
  browser_bridge.addCallback('resize', 'gv-dimensions', () => {
    global_variables.set('window-dimensions', { 'x': window.innerWidth, 'y': window.innerHeight });
  });

  // Recording any mouse movement into global variables, and clearing it after mouse stops.
  let mouse_delta_reset: NodeJS.Timeout;
  browser_bridge.addCallback('mousemove', 'gv-mouse-delta', e => {
    clearTimeout(mouse_delta_reset);
    mouse_delta_reset = setTimeout(() => {
      global_variables.set('mouse-delta', { 'x': 0, 'y': 0 });
    }, 10);
    global_variables.set('mouse-delta', { 'x': (e as MouseEvent).movementX, 'y': (e as MouseEvent).movementY });
  });

  // Temp : Locking mouse pointer on click
  document.body.addEventListener('click', () => {
    document.body.requestPointerLock();
  });
};

export { browser_bridge };
export default brower_initiator;
