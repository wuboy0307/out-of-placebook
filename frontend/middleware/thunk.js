const thunk = ({dispatch, getState}) => {
  return (next) => (action) => {
  if (typeof action === 'function') {
    // console.log('HIT THUNK')
    return action(dispatch, getState);
  }

  return next(action);
  }
};

export default thunk;
