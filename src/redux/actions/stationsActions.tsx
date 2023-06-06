import {Dispatch} from 'redux';
import axios from 'axios';
import {
  StationsAction,
  FETCH_STATIONS_REQUEST,
  FETCH_STATIONS_SUCCESS,
  FETCH_STATIONS_FAILURE,
  FETCH_WASHES_SUCCESS,
  FETCH_WASHES_FAILURE,
  FetchStationsAction,
} from '../types/stationsActionTypes';
import {RootState} from '../store';
import Config from 'react-native-config';
import {ThunkAction} from 'redux-thunk';

export const fetchStations = (): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  StationsAction
> => {
  return async (dispatch: Dispatch<StationsAction>) => {
    dispatch({type: FETCH_STATIONS_REQUEST});

    try {
      const response = await axios.get(
        Config.REACT_APP_SERVER_URL + '/v1/stations/',
      );
      const stations = response.data;

      dispatch({type: FETCH_STATIONS_SUCCESS, payload: stations});
    } catch (error: any) {
      dispatch({type: FETCH_STATIONS_FAILURE, error: error.message});
    }
  };
};

export const fetchStationWashes = (
  id: number,
): ThunkAction<Promise<void>, RootState, undefined, StationsAction> => {
  return async (
    dispatch: Dispatch<StationsAction>,
    getState: () => RootState,
  ) => {
    dispatch({type: FETCH_STATIONS_REQUEST});

    try {
      const response = await axios.get(
        Config.REACT_APP_SERVER_URL + '/v1/stations/washes/id=' + id,
      );

      const washes = response.data;
      dispatch({type: FETCH_WASHES_SUCCESS, payload: washes});
    } catch (error: any) {
      dispatch({type: FETCH_WASHES_FAILURE, error: error.message as string});
    }
  };
};
