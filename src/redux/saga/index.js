import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import countrySaga from './countrySaga';

function* rootSaga() {
    yield all([
        userSaga(),
        countrySaga()
    ]);
}

export default rootSaga;