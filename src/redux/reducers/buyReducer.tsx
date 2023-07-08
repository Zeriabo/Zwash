const initialState = {
  washes: [], // Initial washes state
};

const buyReducer = (
  state = initialState,
  action: {type: any; program: any},
) => {
  console.log(action);
  switch (action.type) {
    case 'BUY_WASH':
      return {
        ...state,
        washes: [...state.washes, action.program],
      };
    case 'CHECKOUT_SUCCESS':
      return {
        // ...state,
        // washes: [...state.washes]
      };
    case 'CHECKOUT_FAILED':
      return {
        ...state,
      };
    case 'PAYMENT_INTENT_SUCCESS':
      console.log(action);
      console.log(state);
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default buyReducer;
