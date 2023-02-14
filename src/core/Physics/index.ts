import web_workers from '../helpers/web_worker';

web_workers.add_worker('physics', import.meta.url);

if (web_workers.physics) {
  (web_workers.physics as Worker).onmessage = e => {
    e;
    // Process event.
  };
}
