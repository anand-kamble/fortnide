type LogFor = 'CORE' | 'UI';

class logger {
  log(from: LogFor, msg: string) {
    const fromMsg = from === 'CORE' ? 'CORE' : 'UI';
    // eslint-disable-next-line no-console
    console.log(`[${fromMsg}] : ${msg}`);
  }

  warn(from: LogFor, msg: string) {
    const fromMsg = from === 'CORE' ? 'CORE' : 'UI';
    // eslint-disable-next-line no-console
    console.warn(`[${fromMsg}] : ${msg}`);
  }
}
const Log = new logger();

export default Log;
