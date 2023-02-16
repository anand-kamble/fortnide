interface Input_properties {
  id: string;
  title: string;
  key: string;
}

const default_Inputs = {
  'fire': '',
  'ADS': '',
  'moment-forward': 'KeyW',
  'moment-backward': 'KeyS',
  'moment-left': 'KeyA',
  'moment-right': 'KeyD',
  'moment-up': 'ArrowUp',
  'moment-down': 'ArrowDown',
  'reload': '',
  'weapon-1': '',
  'weapon-2': '',
  'weapon-3': '',
  'weapon-4': '',
  'weapon-5': '',
  'heal': '',
  'revive': '',
  'interract': '',
  'sprint': '',
};

class _input_keys {
  private inputs: {
    [x: string]: Input_properties;
  };

  constructor() {
    this.inputs = {
      'fire': { 'id': 'fire', 'title': 'fire', 'key': '' },
      'ADS': { 'id': 'ADS', 'title': 'ADS', 'key': '' },
      'moment-forward': { 'id': 'moment-forward', 'title': 'moment-forward', 'key': 'KeyW' },
      'moment-backward': { 'id': 'moment-backward', 'title': 'moment-backward', 'key': 'KeyS' },
      'moment-left': { 'id': 'moment-left', 'title': 'moment-left', 'key': 'KeyA' },
      'moment-right': { 'id': 'moment-right', 'title': 'moment-right', 'key': 'KeyD' },
      'moment-up': { 'id': 'moment-up', 'title': 'moment-up', 'key': 'ArrowUp' },
      'moment-down': { 'id': 'moment-down', 'title': 'moment-down', 'key': 'ArrowDown' },
      'reload': { 'id': 'reload', 'title': 'reload', 'key': 'r' },
      'weapon-1': { 'id': 'weapon-1', 'title': 'weapon-1', 'key': '' },
      'weapon-2': { 'id': 'weapon-2', 'title': 'weapon-2', 'key': '' },
      'weapon-3': { 'id': 'weapon-3', 'title': 'weapon-3', 'key': '' },
      'weapon-4': { 'id': 'weapon-4', 'title': 'weapon-4', 'key': '' },
      'weapon-5': { 'id': 'weapon-5', 'title': 'weapon-5', 'key': '' },
      'heal': { 'id': 'heal', 'title': 'heal', 'key': '' },
      'revive': { 'id': 'revive', 'title': 'revive', 'key': '' },
      'interract': { 'id': 'interract', 'title': 'interract', 'key': '' },
      'sprint': { 'id': 'sprint', 'title': 'sprint', 'key': '' },
    };
  }

  getKey(input: keyof typeof default_Inputs) {
    return this.inputs[input].key;
  }

  reset_to_default() {
    const input_keys = Object.keys(this.inputs);
    input_keys.forEach(v => {
      this.inputs[v].key = (default_Inputs as { [x: string]: string })[v];
    });
  }
}

const input_keys = new _input_keys();
export default input_keys;
