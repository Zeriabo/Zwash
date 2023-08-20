import axios from 'axios';
import {Dispatch} from 'redux';
import Config from 'react-native-config';
import {addMessage, clearMessages} from './messageActions';
import {Alert} from 'react-native';

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
      .then(response => {
        dispatch({type: 'CHECKOUT_SUCCESS', payload: response.data});
      })
      .catch(error => {
        dispatch(addMessage({id: 1, text: error.response.data}));
        setTimeout(() => {
          dispatch(clearMessages());
        }, 2000);
      });
  };
};

export const create_paymentIntent = (program: any, method: any) => {
  return async (dispatch: Dispatch<any>) => {
    //fix later the dates
    program.updatedAt = new Date(program.updatedAt);
    program.createdAt = new Date(program.createdAt);
    const paymentMethod = {
      paymentMethodType: method,
    };
    const paymentRequest = {
      program,
      paymentMethod,
    };
    console.log(paymentRequest);

    await axios
      .post(
        Config.REACT_APP_SERVER_URL + '/v1/payment/create-payment-intent',
        paymentRequest,
      )
      .then(response => {
        console.log(response);
        dispatch({type: 'PAYMENT_INTENT_SUCCESS', payload: response.data});
      })
      .catch(error => {
        console.log(error);
      });
  };
};
export const confirm_payment: any = (payment: any) => {
  return async (dispatch: Dispatch<any>) => {
    await axios
      .post(
        Config.REACT_APP_SERVER_URL + '/v1/payment/confirm-payment',
        payment,
      )
      .then(response => {
        dispatch({type: 'PAYMENT_INTENT_SUCCESS', payload: response.data});
      })
      .catch(error => {
        dispatch(addMessage({id: 1, text: error.response.data}));
        setTimeout(() => {
          dispatch(clearMessages());
        }, 2000);
      });
  };
};
