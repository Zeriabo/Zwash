import axios from 'axios';
import {Dispatch} from 'redux';
import Config from 'react-native-config';
import {addMessage, clearMessages} from './messageActions';

export const buyWash = (program: any) => {
  return {
    type: 'BUY_WASH',
    program: program,
  };
};

export const checkout = (program: any) => {
  return async (dispatch: Dispatch<any>) => {
    console.log(program);
    await axios
      .post(Config.REACT_APP_SERVER_URL + '/v1/payment/create', program)
      .then(response =>
        dispatch({type: 'CHECKOUT_SUCCESS', payload: response.data}),
      )
      .catch(error => {
        console.log(error);
        //     dispatch(addMessage({id: 1, text: error.response.data}));
        setTimeout(() => {
          dispatch(clearMessages());
        }, 2000);
      });
  };
};

export const create_paymentIntent = (program: any) => {
  return async (dispatch: Dispatch<any>) => {
    //fix later the dates
    program.updatedAt = new Date(program.updatedAt);
    program.createdAt = new Date(program.createdAt);
    await axios
      .get(
        Config.REACT_APP_SERVER_URL + '/v1/payment/create-payment-intent',
        program,
      )
      .then(response =>
        dispatch({type: 'PAYMENT_INTENT_SUCCESS', payload: response.data}),
      )
      .catch(error => {
        dispatch(addMessage({id: 1, text: error.response.data}));
        setTimeout(() => {
          dispatch(clearMessages());
        }, 2000);
      });
  };
};
