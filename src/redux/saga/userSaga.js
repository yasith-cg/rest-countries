import { call, put, takeLatest, select } from 'redux-saga/effects';
import { USERNAME, PASSWORD } from '../../utils/local';
import * as types from '../action/types';
import countrySaga from './countrySaga';

// validate user login details
const getUser = action => {
    if (action.payload.username !== USERNAME || action.payload.password !== PASSWORD) {
        throw { message: 'Invalid Username or Password. Try again.' }
    } else {
        return { username: action.payload.username }
    }
}

function* validateUser(action) {
    // get login attempt value from store
    const loginAttempt = yield select(state => state.user.loginAttempt)
    try {
        const user = yield call(getUser, action);
        // put to reducer to update store on successful login
        yield put({ type: types.USER_VALIDATION_SUCCESS, user: user });
        // call countrySaga
        yield call(countrySaga);
        // save user session, then direct to '/distance'
        localStorage.setItem('loggedIn', true);
        action.payload.history.push('/distance')
    } catch (e) {
        // put to reducer to update store after invalid login attempt
        yield put({ type: types.USER_VALIDATION_FAILED, message: e.message });
        const loginAttemptsLeft = 3 - (loginAttempt + 1)
        alert(e.message+'\n'+ loginAttemptsLeft + ' attempts are remaining now!');
    }
}

export default function* userSaga() {
    yield takeLatest(types.VALIDATE_USER, validateUser);
}

