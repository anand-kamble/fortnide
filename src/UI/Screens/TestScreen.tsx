import React, { useEffect } from 'react';
import { core_set_allow_update } from '../../core';
import { Button } from '../Components';
import { test_screen_styles } from '../StyleSheets';

const TestScreen = () => {
  useEffect(() => {
    core_set_allow_update(false);

    return () => {
      core_set_allow_update(true);
    };
  }, []);

  return (
    <div className="flex justify-center	items-center" style={test_screen_styles}>
      {new Array(3).fill(0).map((_, i) => (
        <div className="px-2" key={i}>
          <Button />
        </div>
      ))}
    </div>
  );
};

export default TestScreen;
