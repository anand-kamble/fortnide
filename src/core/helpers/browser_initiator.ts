import global_variables from '../global_variables';

const brower_initiator = () => {
  document.documentElement.setAttribute('lang', navigator.language);
  global_variables.set('window-dimensions', { 'x': window.innerWidth, 'y': window.innerHeight });

  // Adding event listener for window size change.
  window.addEventListener('resize', () => {
    global_variables.set('window-dimensions', { 'x': window.innerWidth, 'y': window.innerHeight });
  });

  // Recording any mouse movement into global variables, and clearing it after mouse stops.
  let mouse_delta_reset: NodeJS.Timeout;
  window.addEventListener('mousemove', e => {
    clearTimeout(mouse_delta_reset);
    mouse_delta_reset = setTimeout(() => {
      global_variables.set('mouse-delta', { 'x': 0, 'y': 0 });
    }, 10);
    global_variables.set('mouse-delta', { 'x': e.movementX, 'y': e.movementY });
  });

  // Temp : Locking mouse pointer on click
  // document.body.addEventListener('click', () => {
  //   document.body.requestPointerLock();
  // });
};

export default brower_initiator;
