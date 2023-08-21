import axios from 'axios';
import Config from 'react-native-config';
import {addMessage, clearMessages} from './messageActions';
import {Alert} from 'react-native';

// Action Types
export const FETCH_BOOKINGS_SUCCESS = 'FETCH_BOOKINGS_SUCCESS';
export const FETCH_BOOKING_SUCCESS = 'FETCH_BOOKING_SUCCESS';
export const CREATE_BOOKING_SUCCESS = 'CREATE_BOOKING_SUCCESS';
export const UPDATE_BOOKING_SUCCESS = 'UPDATE_BOOKING_SUCCESS';
export const DELETE_BOOKING_SUCCESS = 'DELETE_BOOKING_SUCCESS';

// Action Creators
export const fetchBookingsSuccess = (bookings: any) => ({
  type: FETCH_BOOKINGS_SUCCESS,
  payload: bookings,
});

export const fetchBookingSuccess = (booking: any) => ({
  type: FETCH_BOOKING_SUCCESS,
  payload: booking,
});

export const createBookingSuccess = (booking: any) => ({
  type: CREATE_BOOKING_SUCCESS,
  payload: booking,
});

export const updateBookingSuccess = (booking: any) => ({
  type: UPDATE_BOOKING_SUCCESS,
  payload: booking,
});

export const deleteBookingSuccess = (bookingId: any) => ({
  type: DELETE_BOOKING_SUCCESS,
  payload: bookingId,
});

// Thunk Actions
export const fetchBookings = () => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(
        Config.REACT_APP_SERVER_URL + '/v1/bookings',
      );
      dispatch(fetchBookingsSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchBooking = (bookingId: any) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(
        Config.REACT_APP_SERVER_URL + `/v1/bookings/${bookingId}`,
      );
      dispatch(fetchBookingSuccess(response.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const createBooking = (booking: any) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.post(
        Config.REACT_APP_SERVER_URL + '/v1/bookings',
        booking,
      );
      dispatch(createBookingSuccess(response.data));
      // Handle navigation or other actions here
    } catch (error) {
      console.log(error);
      // Handle error messages
    }
  };
};

export const updateBooking = (bookingId: any, booking: any) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.put(
        Config.REACT_APP_SERVER_URL + `/v1/bookings/${bookingId}`,
        booking,
      );
      dispatch(updateBookingSuccess(response.data));
      // Handle navigation or other actions here
    } catch (error) {
      console.log(error);
      // Handle error messages
    }
  };
};

export const deleteBooking = (bookingId: any) => {
  return async (dispatch: any) => {
    try {
      await axios.delete(
        Config.REACT_APP_SERVER_URL + `/v1/bookings/${bookingId}`,
      );
      dispatch(deleteBookingSuccess(bookingId));
      // Handle navigation or other actions here
    } catch (error) {
      console.log(error);
      // Handle error messages
    }
  };
};
