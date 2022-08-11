import React, { useEffect } from 'react';
import brower_initiator from './core/helpers/browser_initiator';
import { init_scene } from './core/render_engine';

function App() {
  brower_initiator();
  init_scene();

  return <span />;
}

export default App;
