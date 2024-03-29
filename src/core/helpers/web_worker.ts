import Log from '../../Logger';

interface worker_data {
  id: string;
  url: string;
  worker: Worker;
}

class _web_workers {
  private workers: worker_data[];
  support: boolean;
  worker: { [x: string]: Worker };

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

  add_worker(id: string, url: string, options?: WorkerOptions) {
    if (this.support) {
      const w = new Worker(url, options);
      this.workers.push({
        'id': id,
        'url': url,
        'worker': w,
      });
      this.worker[id] = w;
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
