import axios from 'axios';
import {Dispatch} from 'redux';
import {addMessage, clearMessages} from './messageActions';
import Config from 'react-native-config';
import Car from '../types/CarType';

// Action types
export const REGISTER_CAR_SUCCESS = 'REGISTER_CAR_SUCCESS';
export const GET_CAR_SUCCESS = 'GET_CAR_SUCCESS';
export const GET_USER_CARS_SUCCESS = 'GET_USER_CARS_SUCCESS';
export const SET_CAR_OWNER_SUCCESS = 'SET_CAR_OWNER_SUCCESS';
export const DELETE_CAR_SUCCESS = 'DELETE_CAR_SUCCESS';

// Action creators
export const registerCarSuccess = (car: Car) => ({
  type: REGISTER_CAR_SUCCESS,
  payload: car,
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
export const deleteCarSuccess = (carId: number) => ({
  type: DELETE_CAR_SUCCESS,
  payload: carId,
});
export const registerCar: any = (userCar: any) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.post(
        Config.REACT_APP_SERVER_URL + '/v1/cars/register',
        userCar,
      );
      console.log('response');
      console.log(response);
      if (response.status === 201) {
        // Car registered successfully
        dispatch(
          addMessage({
            id: 1,
            text: 'Car registered successfully',
            status: 200,
          }),
        );
        dispatch(registerCarSuccess(userCar));
        setTimeout(() => {
          dispatch(clearMessages());
        }, 2000);
      } else {
        dispatch(
          addMessage({
            id: 1,
            text: 'Car registration failed',
            status: 500,
          }),
        );
        setTimeout(() => {
          dispatch(clearMessages());
        }, 2000);
      }
    } catch (error) {
      dispatch(
        addMessage({
          id: 1,
          text: 'An error occurred',
          status: 0,
        }),
      );
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

export const getUserCars = (token: string) => {
  return async (dispatch: Dispatch) => {
    await axios
      .get(Config.REACT_APP_SERVER_URL + `/v1/cars/user/${token}`)
      .then(response => dispatch(getUserCarsSuccess(response.data)))
      .catch(err => console.log(err));
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
// {"car": {"carId": 1, "createDateTime": [2023, 6, 12, 22, 28, 36, 652285000], "dateOfManufacture": 567986400000, "manufacture": "Honda", "registerationPlate": "ABC123", "updateDateTime": [2023, 6, 12, 22, 28, 36, 652297000]}}
export const deleteCar = (userCar: any) => {
  console.log('userCar');
  console.log(userCar.carToRemove);
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.post(
        Config.REACT_APP_SERVER_URL + '/v1/cars/delete',
        userCar.carToRemove,
      );
      console.log(response);
      if (response.status === 202) {
        // Car deleted successfully
        dispatch(deleteCarSuccess(userCar.carToRemove.carId));
        dispatch(
          addMessage({
            id: 1,
            text: 'Car deleted successfully',
            status: 200,
          }),
        );
        setTimeout(() => {
          dispatch(clearMessages());
        }, 2000);
      } else {
        dispatch(
          addMessage({
            id: 1,
            text: 'Car deletion failed',
            status: 500,
          }),
        );
        setTimeout(() => {
          dispatch(clearMessages());
        }, 2000);
      }
    } catch (error) {
      console.log('error');
      console.log(error);
      dispatch(
        addMessage({
          id: 1,
          text: 'An error occurred',
          status: 0,
        }),
      );
      setTimeout(() => {
        dispatch(clearMessages());
      }, 2000);
    }
  };
};
