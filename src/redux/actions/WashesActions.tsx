import {Dispatch} from 'redux';
import {
  FETCH_WASHES_REQUEST,
  FETCH_WASHES_SUCCESS,
  FETCH_WASHES_FAILURE,
  FetchStationsAction,
  WashesAction,
} from '../types/washesActionTypes';
import {RootState} from '../store';
import Config from 'react-native-config';
import {ThunkAction} from 'redux-thunk';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import {client} from '../../../App';

export const SELECT_WASHES = 'SELECT_WASHES';

export const fetchWashesBooked = (
  carId: Number,
): ThunkAction<Promise<void>, RootState, undefined, WashesAction> => {
  return async (dispatch: Dispatch<WashesAction>) => {
    dispatch({type: FETCH_WASHES_REQUEST});

    try {
      const GET_WASHES = gql`
        query getCarBookings($carId: ID!) {
          getCarBookings(carId: $carId) {
            id
            car {
              registerationPlate
              manufacture
              dateOfManufacture
            }
            washingProgram {
              program
              description
              price
            }
            station {
              id
              name
              address
              latitude
              longitude
            }
          }
        }
      `;
      const {data} = await client.query({
        query: GET_WASHES,
        variables: {carId},
      });

      dispatch({
        type: FETCH_WASHES_SUCCESS,
        payload: data.getCarBookings,
      });
    } catch (error: any) {
      console.log(error);
      dispatch({type: FETCH_WASHES_FAILURE, error: error.message as string});
    }
  };
};
