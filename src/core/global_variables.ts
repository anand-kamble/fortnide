import { User_Types } from './modals';

interface global_variables_T {
  'version': number;
  'user_type': User_Types;
  'window-dimensions': {
    'x': number;
    'y': number;
  };
}

class _global_variables {
  private vars: global_variables_T;
  constructor() {
    this.vars = {
      'version': 1,
      'user_type': User_Types.Guest,
      'window-dimensions': { 'x': 0, 'y': 0 },
    } as global_variables_T;
  }

  get(key: keyof global_variables_T) {
    return structuredClone(this.vars[key]);
  }

  set(key: keyof global_variables_T, value: unknown) {
    if (typeof this.vars[key] === typeof value) {
      // @ts-ignore:
      this.vars[key] = value;
    } else {
      throw new Error(`Cannot assign value of type "${String(typeof value)}" to global variable of type "${String(typeof this.vars[key])}".`);
    }
  }
}
const global_variables = new _global_variables();
export default global_variables;
