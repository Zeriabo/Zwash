import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import stationsReducer from './reducers/stationsReducer';
import authReducer from './reducers/authReducer';
import messageReducer from './reducers/messagereducer';
import buyReducer from './reducers/buyReducer';
import bookingReducer from './reducers/bookingReducer';
import carReducer from './reducers/carReducer';
const rootReducer = combineReducers({
  user: authReducer,
  stations: stationsReducer,
  messages: messageReducer,
  cart: buyReducer,
  booking: bookingReducer,
  cars: carReducer,
  // Add more reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
