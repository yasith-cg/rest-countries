import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosLogOut } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../redux/action/userAction';
import styled from 'styled-components';

import '../../style/navigation.css';

// Generate navigation tab component for 'Link' component from 'react-rounter-dom'
const NavTab = styled(Link)`
text-decoration: none;
color: black;
display: inline-block;
text-align: center;
height: 32px;
padding-left: 30px;
padding-right: 30px;
padding-top: 8px;
background-color: ${props => props.backgroundcolor || "rgb(206, 206, 206)"};

&:hover {
    background-color: rgb(227, 227, 227);
    cursor: pointer;
}
`;

// Navigation Bar component
function NavigationBar(props) {
    const [distanceTabBGColor, setDistanceTabBGColor] = useState("rgb(206, 206, 206)")
    const [closestTabBGColor, setClosestTabBGColor] = useState("rgb(206, 206, 206)")
    const [timezoneTabBGColor, setTimezoneTabBGColor] = useState("rgb(206, 206, 206)")
    const [searchTabBGColor, setSearchTabBGColor] = useState("rgb(206, 206, 206)")
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        if (props.route === "distance") {
            setDistanceTabBGColor("rgb(227, 227, 227)");
        } else if (props.route === "closest") {
            setClosestTabBGColor("rgb(227, 227, 227)");
        } else if (props.route === "timezone") {
            setTimezoneTabBGColor("rgb(227, 227, 227)");
        } else if (props.route === "search") {
            setSearchTabBGColor("rgb(227, 227, 227)");
        }
    }, []);

    useEffect(() => {
        if (distanceTabBGColor !== "rgb(206, 206, 206)") {
            setClosestTabBGColor("rgb(206, 206, 206)");
            setTimezoneTabBGColor("rgb(206, 206, 206)");
            setSearchTabBGColor("rgb(206, 206, 206)");
        }
    }, [distanceTabBGColor]);

    useEffect(() => {
        if (closestTabBGColor !== "rgb(206, 206, 206)") {
            setDistanceTabBGColor("rgb(206, 206, 206)");
            setTimezoneTabBGColor("rgb(206, 206, 206)");
            setSearchTabBGColor("rgb(206, 206, 206)");
        }
    }, [closestTabBGColor]);

    useEffect(() => {
        if (timezoneTabBGColor !== "rgb(206, 206, 206)") {
            setDistanceTabBGColor("rgb(206, 206, 206)");
            setClosestTabBGColor("rgb(206, 206, 206)");
            setSearchTabBGColor("rgb(206, 206, 206)");
        }
    }, [timezoneTabBGColor]);

    useEffect(() => {
        if (searchTabBGColor !== "rgb(206, 206, 206)") {
            setDistanceTabBGColor("rgb(206, 206, 206)");
            setClosestTabBGColor("rgb(206, 206, 206)");
            setTimezoneTabBGColor("rgb(206, 206, 206)");
        }
    }, [searchTabBGColor]);

    const logout = () => {
        const payload = {
            history: history
        }
        dispatch(logoutUser(payload));
        localStorage.removeItem('loggedIn');
        history.push('/login');
    }

    return (
        <div className="nav-bar">
            <NavTab to="/distance" backgroundcolor={distanceTabBGColor} onClick={e => setDistanceTabBGColor("rgb(227, 227, 227)")}>FIND DISTANCE BETWEEN TWO COUNTRIES</NavTab>
            <NavTab to="/closest" backgroundcolor={closestTabBGColor} onClick={e => setClosestTabBGColor("rgb(227, 227, 227)")}>FIND CLOSEST COUNTRY</NavTab>
            <NavTab to="/timezone" backgroundcolor={timezoneTabBGColor} onClick={e => setTimezoneTabBGColor("rgb(227, 227, 227)")}>FIND COUNTRIES WITHIN TIMEZONES</NavTab>
            <NavTab to="/search" backgroundcolor={searchTabBGColor} onClick={e => setSearchTabBGColor("rgb(227, 227, 227)")}>SEARCH COUNTRIES</NavTab>
            <Link to="/login" onClick={e => logout()} className="logout-icon"><IoIosLogOut id="logout-btn" /></Link>
        </div>
    );
}

export default NavigationBar;