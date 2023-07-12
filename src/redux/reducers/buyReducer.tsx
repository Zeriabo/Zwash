const initialState = {
  washes: [], // Initial washes state
  pi: null,
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
      return {
        ...state,
        pi: action.payload,
      };

    default:
      return state;
  }
};

export default buyReducer;
