import global_variables from '../global_variables';

const brower_initiator = () => {
  document.documentElement.setAttribute('lang', navigator.language);
  global_variables.set('window-dimensions', { 'x': window.innerWidth, 'y': window.innerHeight });
  // Adding event listener for window size change.
  window.addEventListener('resize', () => {
    global_variables.set('window-dimensions', { 'x': window.innerWidth, 'y': window.innerHeight });
  });
  document.body.addEventListener('click', () => {
    document.body.requestPointerLock();
  });
};

export default brower_initiator;
