import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateUser } from '../../redux/action/userAction';
import { useHistory } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const loginAttempt = useSelector(state => state.user.loginAttempt);
    let history = useHistory();

    useEffect(() => {
        if (localStorage.getItem('loggedIn') !== null) {
            history.push('/distance');
        }
    }, []);

    const loginAttemptValidate = () => {
        if (loginAttempt != 3) {
            return true;
        } else {
            return false;
        }
    }

    const dispatchLogin = () => {
        const payload = {
            username: username,
            password: password,
            history: history
        }
        if (loginAttemptValidate()) {
            dispatch(validateUser(payload));
        } else {
            alert("Login failed. No attempts are left.")
        }
    }

    return (
        <div className="login-content">
            <div><input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter Username"></input></div>
            <div><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Password"></input></div>
            <div><button onClick={e => dispatchLogin()}>Login</button></div>
        </div>
    );
}

export default Login;