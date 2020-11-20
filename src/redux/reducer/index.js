import { combineReducers } from 'redux';
import userReducer from './userReducer';
import countryReducer from './countryReducer';

const rootReducer = combineReducers({
    user: userReducer,
    country: countryReducer
});

export default rootReducer;