interface AuthState {
  user: User | null;
  error: any;
}
interface User {
  '@class': string;
  active: boolean;
  createDateTime: string | null;
  dateOfBirth: string;
  deviceRegistrationToken: string | null;
  firstName: string;
  id: number;
  lastName: string;
  token: string;
  updateDateTime: string | null;
  username: string;
}
interface Action {
  type: string;
  payload: any | User;
}

const initialState: AuthState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action: Action): AuthState => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case 'SIGN_IN_ERROR':
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
