import axios from 'axios';
import {Dispatch} from 'redux';
import {addMessage, clearMessages} from './messageActions';
import Config from 'react-native-config';

// Action types
export const REGISTER_CAR_SUCCESS = 'REGISTER_CAR_SUCCESS';
export const GET_CAR_SUCCESS = 'GET_CAR_SUCCESS';
export const GET_USER_CARS_SUCCESS = 'GET_USER_CARS_SUCCESS';
export const SET_CAR_OWNER_SUCCESS = 'SET_CAR_OWNER_SUCCESS';

// Action creators
export const registerCarSuccess = () => ({
  type: REGISTER_CAR_SUCCESS,
});

export const getCarSuccess = (car: Car) => ({
  type: GET_CAR_SUCCESS,
  payload: car,
});

export const getUserCarsSuccess = (cars: Car[]) => ({
  type: GET_USER_CARS_SUCCESS,
  payload: cars,
});

export const setCarOwnerSuccess = () => ({
  type: SET_CAR_OWNER_SUCCESS,
});

export const registerCar: any = (userCar: any) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.post(
        Config.REACT_APP_SERVER_URL + '/v1/cars/register',
        userCar,
      );
      if (response.status === 202) {
        // Car registered successfully
        dispatch(addMessage({id: 1, text: 'Car registered successfully'}));
        dispatch(registerCarSuccess());
        setTimeout(() => {
          dispatch(clearMessages());
        }, 2000);
      } else {
        dispatch(addMessage({id: 1, text: 'Car registration failed'}));
        setTimeout(() => {
          dispatch(clearMessages());
        }, 2000);
      }
    } catch (error) {
      dispatch(addMessage({id: 1, text: 'An error occurred'}));
      setTimeout(() => {
        dispatch(clearMessages());
      }, 2000);
    }
  };
};

export const getCar = (registrationPlate: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        Config.REACT_APP_SERVER_URL + `/v1/cars/${registrationPlate}`,
      );
      dispatch(getCarSuccess(response.data));
    } catch (error) {
      // Handle error
    }
  };
};

export const getUserCars = (username: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        Config.REACT_APP_SERVER_URL + `/v1/cars/user/${username}`,
      );
      dispatch(getUserCarsSuccess(response.data));
    } catch (error) {
      // Handle error
    }
  };
};

export const setCarOwner = (userCar: any) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.post(Config.REACT_APP_SERVER_URL + '/v1/cars/set', userCar);
      dispatch(setCarOwnerSuccess());
    } catch (error) {
      // Handle error
    }
  };
};
