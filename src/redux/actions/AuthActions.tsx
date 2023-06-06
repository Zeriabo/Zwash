import axios from 'axios';
import {Dispatch} from 'redux';
import Config from 'react-native-config';
import {addMessage, clearMessages} from './messageActions';

export const signIn = (userData: any) => {
  return async (dispatch: Dispatch<any>) => {
    await axios
      .post('http://localhost:7001/users/signin', userData) //Config.REACT_APP_SERVER_URL +
      .then(response => console.log(response))
      .catch(error => {
        dispatch(addMessage({id: 1, text: error.response.data}));
        setTimeout(() => {
          dispatch(clearMessages());
        }, 2000);
      });
  };
};

export const signUp = (userData: any) => {
  return async (dispatch: Dispatch<any>) => {
    await axios
      .post('http://localhost:7001/users/register', userData)
      .then((response: any) => {
        console.log(response);
      })
      .catch((error: any) => {
        console.log(error.response.status == 500);
        console.log(error.response.data);
        if (error.response.status == 500) {
          dispatch(addMessage({id: 1, text: error.response.data}));
          // dispatch(
          //   addMessage({
          //     id: error.response.status,
          //     text: 'Server Error: check input!',
          //   }),
          // );
        } else {
          dispatch(
            addMessage({id: error.response.status, text: error.response.data}),
          );
        }

        setTimeout(() => {
          dispatch(clearMessages());
        }, 2000);
      });
  };
};
export const signOut = () => {
  return {type: 'SIGN_OUT'};
};
