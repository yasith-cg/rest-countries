import { call, put } from "redux-saga/effects";

import * as types from '../action/types';

const apiUrl = 'https://restcountries.eu/rest/v2/all';

// get data from api
const getCountries = () => {
    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    }).then(response => response.json())
    .catch((err) => {throw err});
}

export default function* countrySaga() {
    const countries = yield call(getCountries);
    // put to reducer to update store
    yield put({ type: types.STORE_COUNTRIES, countries: countries });
}