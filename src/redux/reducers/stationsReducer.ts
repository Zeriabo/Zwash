import {
  FETCH_STATIONS_REQUEST,
  FETCH_STATIONS_SUCCESS,
  FETCH_STATIONS_FAILURE,
} from '../types/stationsActionTypes';

interface Station {
  id: string;
  name: string;
  address: string;
  media: string;
}

interface StationsState {
  stations: Station[];
  error: string | null;
}

const initialState: StationsState = {
  stations: [],
  error: null,
};

const stationsReducer = (state = initialState, action: any): StationsState => {
  console.log(action);
  switch (action.type) {
    case FETCH_STATIONS_SUCCESS:
      return {
        ...state,
        stations: action.stations,
        error: null,
      };
    case FETCH_STATIONS_FAILURE:
      return {
        ...state,
        stations: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default stationsReducer;
