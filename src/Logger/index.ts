/* eslint-disable no-console */
type LogFor = 'CORE' | 'UI' | 'PHYSICS_ENGINE';

class logger {
  log(from: LogFor, msg: string) {
    console.log(`[${from}] : ${msg}`);
  }

  warn(from: LogFor, msg: string) {
    console.warn(`[${from}] : ${msg}`);
  }

  error(from: LogFor, msg: string) {
    console.error(`[${from}] : ${msg}`);
  }
}
const Log = new logger();

export default Log;
