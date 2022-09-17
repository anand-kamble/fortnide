import React from 'react';
import { ScreenType } from '.';
import { Button } from '../Components';

const Loading = ({ set_state, state }: ScreenType) => {
  return (
    <div className="loader-box">
      <h1>Welcome</h1>
      <p>
        {`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s`}
      </p>
      <Button
        play_sound={false}
        text="CONTINUE"
        on_click={() => {
          set_state({ ...state, 'warning_accepted': true });
        }}
      />
    </div>
  );
};

export default Loading;
