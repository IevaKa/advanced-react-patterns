import React, { useState } from 'react';
import { Switch } from '../Switch';
import { useToggle, ACTION_TYPE } from './useToggle';

export function StateReducer() {
  const [clicksSinceReset, setClicksSinceReset] = useState(0);
  const tooManyClicks = clicksSinceReset >= 4;

  const {
    on, toggle, setOn, setOff,
  } = useToggle({
    reducer(state, action) {
      if (tooManyClicks && action.type === ACTION_TYPE.TOGGLE) {
        return { ...action.changes, on: state.on };
      }
      return action.changes;
    },
  });

  const handleClick = () => {
    if (!tooManyClicks) {
      toggle();
      setClicksSinceReset((old) => old + 1);
    }
  };

  return (
    <div>
      <button onClick={setOff}>Switch Off</button>
      <button onClick={setOn}>Switch On</button>
      <Switch on={on} onClick={handleClick} />
      {tooManyClicks ? <button onClick={() => setClicksSinceReset(0)}>Reset</button> : null}
    </div>
  );
}
