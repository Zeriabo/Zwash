import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import stationsReducer from './reducers/stationsReducer';
import authReducer from './reducers/authReducer';
import messageReducer from './reducers/messagereducer';

const rootReducer = combineReducers({
  user: authReducer,
  stations: stationsReducer,
  messages: messageReducer,
  // Add more reducers here if needed
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
