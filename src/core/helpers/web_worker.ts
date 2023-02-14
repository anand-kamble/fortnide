import Log from '../../Logger';
interface worker_data {
  id: string;
  url: string;
  worker: Worker;
}
class _web_workers {
  workers: worker_data[];
  support: boolean;
  [k: string]: Worker | typeof this[keyof this];

  constructor() {
    this.workers = [];
    this.support = true;
  }

  init() {
    if (typeof Worker === 'undefined') {
      Log.warn('CORE', 'Web-workers not supported.');
      this.support = false;
    }
  }

  add_worker(id: string, url: string, options: WorkerOptions) {
    if (id.includes(' ')) throw new Error('worker id cannot include spaces.');
    if (this.support) {
      const w = new Worker(url, options);
      this.workers.push({
        'id': id,
        'url': url,
        'worker': w,
      });
      this[id] = w;
      return w;
    } else {
      Log.error('CORE', 'Web-workers not supported.');
    }
  }

  list_workers() {
    return this.workers.map(v => ({ 'id': v.id, 'url': v.url }));
  }

  terminate_all() {
    this.workers.forEach(w => w.worker.terminate());
  }
}

const web_workers = new _web_workers();
export default web_workers;
