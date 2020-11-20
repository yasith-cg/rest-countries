import * as types from '../action/types';

const initialState = {
    username: "",
    loggedIn: false,
    loginAttempt: 0
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.USER_VALIDATION_SUCCESS:
            // update store after succesful login
            return {
                ...state,
                username: action.user.username,
                loggedIn: true,
                loginAttempt: 0
            };
        case types.USER_VALIDATION_FAILED:
            if (action.message === 'Invalid Username or Password. Try again.') {
                // update store after invalid login attempt
                return {
                    ...state,
                    loginAttempt: state.loginAttempt + 1
                };
            } else {
                return state;
            }
        case types.USER_LOGOUT:
            // update store after logout
            return {
                ...state,
                username: "",
                loggedIn: false
            };
        default:
            return state;
    }
}
