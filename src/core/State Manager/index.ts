import { Clock } from 'three';
import { Game_State, User_Types, User_data } from '../modals';
import { animator } from '../render_engine';

interface Listener_type {
  for: keyof Game_State;
  cb: (g: Game_State) => void;
}
class _State_manager {
  userType: User_Types;
  userData: User_data | null;
  game_state: Game_State;
  ChangeListeners: Listener_type[];
  clock: Clock;

  constructor() {
    this.userData = null;
    this.userType = User_Types.Guest;
    this.game_state = {
      'ammo': {},
      'Other_Players': [],
      'Player_State': null,
      'User': null,
      'timestamp': 0,
      'weapons': [],
    };
    this.ChangeListeners = [];
    this.clock = animator.clock;
  }

  update_state<K extends keyof Game_State>(stateKey: K, data: Game_State[K]) {
    if (this.game_state[stateKey] !== data) {
      this.game_state[stateKey] = data;
      this.game_state.timestamp = this.clock.elapsedTime;
      this.ChangeListeners.forEach(f => (f.for === stateKey ? f.cb(this.game_state) : null));
    }
  }

  addStateListener(callback: (typeof this.ChangeListeners)[0]) {
    this.ChangeListeners.push(callback);
  }
}

const State_manager = new _State_manager();

export default State_manager;
