// stationsActionTypes.ts
export const FETCH_STATIONS_REQUEST = 'FETCH_STATIONS_REQUEST';
export const FETCH_STATIONS_SUCCESS = 'FETCH_STATIONS_SUCCESS';
export const FETCH_STATIONS_FAILURE = 'FETCH_STATIONS_FAILURE';
export const FETCH_WASHES_SUCCESS = 'FETCH_WASHES_SUCCESS';
export const FETCH_WASHES_FAILURE = 'FETCH_WASHES_FAILURE';

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

interface FetchWashesSuccessAction {
  type: typeof FETCH_WASHES_SUCCESS;
}
interface FetchWashesFailureAction {
  type: typeof FETCH_WASHES_FAILURE;
}
export type StationsAction =
  | FetchStationsRequestAction
  | FetchStationsSuccessAction
  | FetchStationsFailureAction
  | FetchWashesSuccessAction
  | FetchWashesFailureAction;

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
