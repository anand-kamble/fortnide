import React, { useEffect } from 'react';
import brower_initiator from './core/helpers/browser_initiator';
import { init_scene } from './core/render_engine';
import player_group_object from './core/render_engine/player_group';

function App() {
  brower_initiator();
  init_scene();
  player_group_object();
  return <span />;
}

export default App;
