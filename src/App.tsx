import React from 'react';
import { core_set_allow_update } from './core';
import brower_initiator from './core/helpers/browser_initiator';
import { init_scene } from './core/render_engine';
import player_group_object from './core/render_engine/player_group';
// import Render from './UI/Render/Render';

function App() {
  brower_initiator();
  init_scene();
  player_group_object();
  core_set_allow_update(true);
  return <span />;
  // return <Render />;
}

export default App;
