const initialState = {
  washes: [], // Initial washes state
};

const buyReducer = (
  state = initialState,
  action: {type: any; program: any},
) => {
  switch (action.type) {
    case 'BUY_WASH':
      return {
        ...state,
        washes: [...state.washes, action.program],
      };
    default:
      return state;
  }
};

export default buyReducer;
