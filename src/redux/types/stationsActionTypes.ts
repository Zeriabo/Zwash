// stationsActionTypes.ts
export const FETCH_STATIONS_REQUEST = 'FETCH_STATIONS_REQUEST';
export const FETCH_STATIONS_SUCCESS = 'FETCH_STATIONS_SUCCESS';
export const FETCH_STATIONS_FAILURE = 'FETCH_STATIONS_FAILURE';
export const SELECT_STATION = 'SELECT_STATION';

interface FetchStationsRequestAction {
  type: typeof FETCH_STATIONS_REQUEST;
}

interface FetchStationsSuccessAction {
  type: typeof FETCH_STATIONS_SUCCESS;
  payload: Station[];
}

interface FetchStationsFailureAction {
  type: typeof FETCH_STATIONS_FAILURE;
  error: string;
}

export type StationsAction =
  | FetchStationsRequestAction
  | FetchStationsSuccessAction
  | FetchStationsFailureAction;

export interface Station {
  id: string;
  name: string;
  address: string;
  media: string;
}

interface StationsState {
  stations: Station[];
  error: string | null;
  loading: boolean;
}

export interface RootState {
  stations: StationsState;
}

export interface CarWashingProgram {
  id: number;
  name: string;
  // Other properties...
}

export type FetchStationsAction =
  | FetchStationsRequestAction
  | FetchStationsSuccessAction
  | FetchStationsFailureAction;
