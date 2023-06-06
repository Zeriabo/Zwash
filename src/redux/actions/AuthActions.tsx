import axios from 'axios';
import {Dispatch, AnyAction} from 'redux';
import Config from 'react-native-config';
import {addMessage, clearMessages} from './messageActions';
import {HttpStatusCode} from 'axios';
import {Alert} from 'react-native';
export const signIn = (userData: any) => {
  return async (dispatch: Dispatch<any>) => {
    await axios
      .post('http://localhost:7001/users/signin', userData)
      .then(response => console.log(response))
      .catch(error => {
        dispatch(addMessage({id: 1, text: error.response.data}));
        setTimeout(() => {
          dispatch(clearMessages());
        }, 2000);
      });
  };
};

export const signOut = () => {
  return {type: 'SIGN_OUT'};
};
