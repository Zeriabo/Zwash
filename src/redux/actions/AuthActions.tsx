import axios from 'axios';
import {Dispatch} from 'redux';
import Config from 'react-native-config';
import {addMessage, clearMessages} from './messageActions';
import {getUserCars} from './carActions';

export const signIn = (userData: any) => {
  console.log(Config.REACT_APP_SERVER_URL);
  return async (dispatch: Dispatch<any>) => {
    console.log(userData);

    await axios
      .post(Config.REACT_APP_SERVER_URL + '/signin', userData)
      .then(response => {
        console.log(response);
        dispatch({type: 'SIGN_IN_SUCCESS', payload: response.data}),
          dispatch(getUserCars(response.data.token));
      })
      .catch(error => {
        dispatch(
          addMessage({
            id: 1,
            text: error.response.data,
            status: 500,
          }),
        );
        setTimeout(() => {
          dispatch(clearMessages());
        }, 2000);
      });
  };
};

export const signUp = (userData: any) => {
  return async (dispatch: Dispatch<any>) => {
    await axios
      .post(Config.REACT_APP_SERVER_URL + '/users/register', userData)
      .then((response: any) => {
        dispatch(
          addMessage({
            id: 1,
            text: 'Registeration successful',
            status: 200,
          }),
        );
        dispatch({type: 'SIGN_UP_SUCCESS', payload: response.data});
      })
      .catch((error: any) => {
        if (error.response.status == 500) {
          dispatch(
            addMessage({
              id: 1,
              text: error.response.data,
              status: 500,
            }),
          );
          dispatch({type: 'SIGN_UP_FAILED', payload: error.response.data});
        } else {
          dispatch(
            addMessage({
              id: error.response.status,
              text: error.response.data,
              status: 500,
            }),
          );
          dispatch({type: 'SIGN_UP_FAILED', payload: error.response.data});
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
