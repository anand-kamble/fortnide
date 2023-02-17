import global_variables from './global_variables';
import Log from '../../Logger/index';

interface cbStructure {
  id: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  cb: Function;
}
class _browser_bridge {
  private triggers: {
    [x: string]: cbStructure[];
  };
  private active_triggers: string[];

  constructor() {
    this.triggers = {};
    this.addListeners();
    this.active_triggers = [];
  }

  addCallback<K extends keyof WindowEventMap>(callbackFor: K, id: string, callback: (e: WindowEventMap[K]) => void) {
    try {
      if (this.triggers[callbackFor] === undefined) this.triggers[callbackFor] = [];
      this.triggers[callbackFor].push({ 'id': id, 'cb': callback });
      this.addListeners();
    } catch (error) {
      Log.warn('CORE', `[browser_bridge] : Failed to add callback with id : ${id}`);
    }
  }

  removeCallback(callbackFor: keyof WindowEventMap, id: string) {
    try {
      let indexOfCallback = -1;
      this.triggers[callbackFor].forEach((cb, i) => {
        if (cb.id === id) {
          indexOfCallback = i;
        }
      });
      if (indexOfCallback > -1) {
        this.triggers[callbackFor].splice(indexOfCallback, 1);
      }
    } catch (error) {
      Log.warn('CORE', `[browser_bridge] : Failed to remove callback with id : ${id}`);
    }
  }

  addListeners() {
    const typesOfListener = Object.keys(this.triggers) as unknown as Array<keyof WindowEventMap>;
    typesOfListener.forEach(type => {
      if (!this.active_triggers.includes(type)) {
        try {
          window.addEventListener(type, e => {
            this.triggers[type].forEach(v => {
              v.cb(e);
            });
          });
          this.active_triggers.push(type);
        } catch (e) {
          Log.warn('CORE', `[browser_bridge] : Failed to add listener of type : ${type}`);
        }
      }
    });
  }
}
const browser_bridge = new _browser_bridge();

export const brower_initiator = () => {
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

export default browser_bridge;
