import React, { useEffect } from 'react';
import { ScreenType } from '.';
import { core_set_allow_update } from '../../core';
import { Button } from '../Components';
import { test_screen_styles } from '../StyleSheets';

const TestScreen = ({ set_state, state }: ScreenType) => {
  useEffect(() => {
    core_set_allow_update(false);

    return () => {
      core_set_allow_update(true);
    };
  }, []);

  return (
    <div className="flex justify-center	items-center" style={test_screen_styles}>
      <div className="px-2">
        <Button
          text="Start"
          on_click={() => {
            core_set_allow_update(true);
            set_state({ ...state, 'started': true });
            document.body.requestPointerLock();
          }}
        />
      </div>
    </div>
  );
};

export default TestScreen;
