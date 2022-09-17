/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import { Vector3 } from 'three';
import { User_Types } from './modals';

interface _var_structure<T> {
  value: T;
  callbacks: Function[];
}
interface global_variables_T {
  'version': _var_structure<number>;
  'user_type': _var_structure<User_Types>;
  'max-fps': _var_structure<number>;
  'mouse-delta': _var_structure<{
    'x': number;
    'y': number;
  }>;
  'mouse-sensitivity': _var_structure<number>;
  'window-dimensions': _var_structure<{
    'x': number;
    'y': number;
  }>;
}

class _global_variables {
  private vars: global_variables_T;
  private observers: {
    var_id: keyof global_variables_T;
    callbacks: Function[];
  }[];
  private update: boolean;
  constructor() {
    this.vars = {
      'version': { 'value': 1, 'callbacks': [() => {}] },
      'user_type': { 'value': User_Types.Guest, 'callbacks': [() => {}] },
      'window-dimensions': { 'value': { 'x': window.innerWidth || 1, 'y': window.innerHeight || 1 }, 'callbacks': [() => {}] },
      'max-fps': { 'value': 60, 'callbacks': [() => {}] },
      'mouse-delta': { 'value': { 'x': 0, 'y': 0 }, 'callbacks': [() => {}] },
      'mouse-sensitivity': { 'value': 0.2, 'callbacks': [() => {}] },
    } as global_variables_T;
    this.observers = Object.keys(this.vars).map(v => ({ 'var_id': v as keyof global_variables_T, 'callbacks': [() => {}] }));
    this.update = false;
  }

  // CONST which wont be changed during run time.
  readonly X_axis = new Vector3(1, 0, 0);
  readonly Y_axis = new Vector3(0, 1, 0);
  readonly Z_axis = new Vector3(0, 0, 1);

  get(key: keyof global_variables_T) {
    return structuredClone(this.vars[key].value);
  }

  set(key: keyof global_variables_T, value: unknown) {
    if (!this.update) return;
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

  allow_update(value: boolean) {
    this.update = value;
  }
}
const global_variables = new _global_variables();
export default global_variables;
