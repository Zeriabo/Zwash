import {Action} from 'redux';
import {SELECT_WASHES} from '../actions/WashesActions';
import {Wash} from '../types/washesActionTypes';

interface WashesState {
  washes: Wash[] | null;
}
const initialState: WashesState = {
  washes: null,
};

const washesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SELECT_WASHES:
      return {
        ...state,
        washes: action.payload,
      };
    default:
      return state;
  }
};

export default washesReducer;
