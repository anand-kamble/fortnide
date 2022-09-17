import React from 'react';
import brower_initiator from './core/helpers/browser_initiator';
import { init_scene } from './core/render_engine';
import player_group_object from './core/render_engine/player_group';
import Render from './UI/Render/Render';

function App() {
  brower_initiator();
  init_scene();
  player_group_object();
  return <Render />;
}

export default App;
