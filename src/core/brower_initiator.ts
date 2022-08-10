import { get_element } from './helpers';

const brower_initiator = () => {
  document.documentElement.setAttribute('lang', navigator.language);
  const body = get_element('body');
};

export default brower_initiator;
