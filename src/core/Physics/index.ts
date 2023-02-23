import web_workers from '../helpers/web_worker';

web_workers.add_worker('physics', import.meta.url);

if (web_workers.worker.physics) {
  web_workers.worker.physics.onmessage = e => {
    e;
    // Process event.
  };
}
