import { Game_State, User_Types, User_data } from '../modals';

class State_manager {
  userType: User_Types;
  userData: User_data | null;
  game_state: Game_State;
  ChangeListeners: ((g: Game_State) => void)[];

  constructor() {
    this.userData = null;
    this.userType = User_Types.Guest;
    this.game_state = {
      'ammo': {},
      'Other_Players': [],
      'Player_State': null,
      'User': null,
    };
    this.ChangeListeners = [];
  }

  update_state<K extends keyof Game_State>(stateKey: K, data: Game_State[K]) {
    if (this.game_state[stateKey] !== data) {
      this.game_state[stateKey] = data;
    }
  }

  on_State_Change() {
    this.ChangeListeners.forEach(f => this.game_state && f(this.game_state));
  }
}

export default State_manager;
