import React from 'react';
import brower_initiator from './core/helpers/browser_initiator';
import init from './core/render_engine/init';

function App() {
  brower_initiator();
  init();
  return <span />;
}

export default App;
