import * as types from '../action/types';

const initialState = {
    countries: []
};

export default function countryReducer(state = initialState, action) {
    switch (action.type) {
        // store country data from api
        case types.STORE_COUNTRIES:
            return {
                ...state,
                countries: action.countries
            };
        default:
            return state;
    }
}