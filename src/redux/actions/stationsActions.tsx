import {Dispatch} from 'redux';
import {
  StationsAction,
  FETCH_STATIONS_REQUEST,
  FETCH_STATIONS_SUCCESS,
  FETCH_STATIONS_FAILURE,
  FetchStationsAction,
} from '../types/stationsActionTypes';
import {RootState} from '../store';
import Config from 'react-native-config';
import {ThunkAction} from 'redux-thunk';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import {client} from '../../../App';

export const fetchStations = (): ThunkAction<
  Promise<void>,
  RootState,
  undefined,
  StationsAction
> => {
  return async (dispatch: Dispatch<StationsAction>) => {
    dispatch({type: FETCH_STATIONS_REQUEST});

    try {
      const GET_STATIONS = gql`
        query {
          getAllStations {
            id
            name
            address
            media {
              id
            }
            programs {
              id
              programType
              description
              price
            }
            latitude
            longitude
          }
        }
      `;

      const {data} = await client.query({
        query: GET_STATIONS,
      });
      console.log('staton data');

      // Remove __typename from programs array
      const stationsWithoutTypename = data.getAllStations.map(
        (station: any) => {
          const {__typename, ...stationWithoutTypename} = station;
          return {
            ...stationWithoutTypename,
            programs: stationWithoutTypename.programs.map((program: any) => {
              const {__typename: programTypename, ...rest} = program;
              return rest;
            }),
          };
        },
      );
      dispatch({
        type: FETCH_STATIONS_SUCCESS,
        payload: stationsWithoutTypename,
      });
    } catch (error: any) {
      dispatch({type: FETCH_STATIONS_FAILURE, error: error.message as string});
    }
  };
};
