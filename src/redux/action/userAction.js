import * as types from './types';

export const validateUser = payload => ({
    type: types.VALIDATE_USER,
    payload: payload
});

export const logoutUser = payload => ({
    type: types.USER_LOGOUT,
    payload: payload
});