import React, { useEffect, useState } from 'react';
import { State_manager } from '../../core';

const Weapon = () => {
  const [ammo, setAmmo] = useState(0);

  useEffect(() => {
    State_manager.addStateListener({
      'for': 'weapons',
      'cb': g => {
        setAmmo(g.weapons[0]?.MagzineState.count - 1);
      },
    });
  }, []);
  return (
    <div className="absolute w-20 h-20 bg-white bottom-20 left-20 flex align-center items-center justify-center">
      Weapon
      <br />
      {ammo}
    </div>
  );
};

export default Weapon;
