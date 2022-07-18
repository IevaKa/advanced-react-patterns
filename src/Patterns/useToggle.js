import { useReducer } from 'react';

export const ACTION_TYPE = {
  TOGGLE: 'TOGGLE',
  ON: 'ON',
  OFF: 'OFF',
};

function toggleReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE.TOGGLE: {
      return { on: !state.on };
    }
    case ACTION_TYPE.ON: {
      return { on: true };
    }
    case ACTION_TYPE.OFF: {
      return { on: false };
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

export const useToggle = ({ reducer = (state, action) => action.changes } = {}) => {
  const [{ on }, dispatch] = useReducer((state, action) => {
    const changes = toggleReducer(state, action);
    return reducer(state, { ...action, changes });
  }, { on: false });

  const toggle = () => dispatch({ type: ACTION_TYPE.TOGGLE });
  const setOn = () => dispatch({ type: ACTION_TYPE.ON });
  const setOff = () => dispatch({ type: ACTION_TYPE.OFF });

  return {
    on, toggle, setOn, setOff,
  };
};
