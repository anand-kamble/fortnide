import { User_Types } from './modals';

interface _var_structure<T> {
  value: T;
  callbacks: Function[];
}
interface global_variables_T {
  'version': _var_structure<number>;
  'user_type': _var_structure<User_Types>;
  'window-dimensions': _var_structure<{
    'x': number;
    'y': number;
  }>;
  'max-fps': _var_structure<number>;
}

class _global_variables {
  private vars: global_variables_T;
  private observers: {
    var_id: keyof global_variables_T;
    callbacks: Function[];
  }[];
  constructor() {
    this.vars = {
      'version': { 'value': 1, 'callbacks': [() => {}] },
      'user_type': { 'value': User_Types.Guest, 'callbacks': [() => {}] },
      'window-dimensions': { 'value': { 'x': window.innerWidth || 1, 'y': window.innerHeight || 1 }, 'callbacks': [() => {}] },
      'max-fps': { 'value': 60, 'callbacks': [() => {}] },
    } as global_variables_T;
    this.observers = Object.keys(this.vars).map(v => ({ 'var_id': v as keyof global_variables_T, 'callbacks': [() => {}] }));
  }

  get(key: keyof global_variables_T) {
    return structuredClone(this.vars[key].value);
  }

  set(key: keyof global_variables_T, value: unknown) {
    if (typeof this.vars[key] === typeof value) {
      this.vars[key].value = value as never;
      this.vars[key].callbacks.forEach(cb => cb(value));
    } else {
      throw new Error(`Cannot assign value of type "${String(typeof value)}" to global variable of type "${String(typeof this.vars[key])}".`);
    }
  }

  addObserver(key: keyof global_variables_T, callback: Function) {
    this.vars[key].callbacks.push(callback);
  }
}
const global_variables = new _global_variables();
export default global_variables;
