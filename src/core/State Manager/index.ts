import { Clock } from 'three';
import { Game_State, User_Types, User_data } from '../modals';
import { animator } from '../render_engine';

class _State_manager {
  userType: User_Types;
  userData: User_data | null;
  game_state: Game_State;
  ChangeListeners: ((g: Game_State) => void)[];
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
    };
    this.ChangeListeners = [];
    this.clock = animator.clock;
  }

  update_state<K extends keyof Game_State>(stateKey: K, data: Game_State[K], timestamp: number) {
    if (this.game_state[stateKey] !== data && this.game_state.timestamp < timestamp) {
      this.game_state[stateKey] = data;
      this.game_state.timestamp = timestamp;
      this.on_State_Change();
    }
  }

  on_State_Change() {
    this.ChangeListeners.forEach(f => this.game_state && f(this.game_state));
  }
}

const State_manager = new _State_manager();

export default State_manager;
