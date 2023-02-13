import React, { useState } from 'react';
import { Loading, TestScreen } from '../Screens';
import './index.css';

function Render() {
  const [state, setState] = useState({
    'warning_accepted': true,
    'started': true,
  });
  return (
    <>
      {!state.started && <TestScreen state={state} set_state={setState} />}
      {!state.warning_accepted && <Loading state={state} set_state={setState} />}
    </>
  );
}

export default Render;
