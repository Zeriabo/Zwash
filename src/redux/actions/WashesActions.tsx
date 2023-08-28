import {Dispatch} from 'redux';
import {
  FETCH_WASHES_REQUEST,
  FETCH_WASHES_SUCCESS,
  FETCH_WASHES_FAILURE,
  FetchStationsAction,
} from '../types/washesActionTypes';
import {RootState} from '../store';
import Config from 'react-native-config';
import {ThunkAction} from 'redux-thunk';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import {client} from '../../../App';

export const SELECT_WASHES = 'SELECT_WASHES';

export const fetchWashesBooked = (
  carId: Number,
): ThunkAction<Promise<void>, RootState, undefined, StationsAction> => {
  return async (dispatch: Dispatch<StationsAction>) => {
    dispatch({type: FETCH_WASHES_REQUEST});

    try {
      const GET_WASHES = gql`
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
              program
              description
              price
            }
            latitude
            longitude
          }
        }
      `;

      const {data} = await client.query({
        query: GET_WASHES,
      });
      // Remove __typename from programs array

      dispatch({
        type: FETCH_WASHES_SUCCESS,
        washes: data,
      });
    } catch (error: any) {
      dispatch({type: FETCH_WASHES_FAILURE, error: error.message as string});
    }
  };
};
