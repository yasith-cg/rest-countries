import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { getDistance } from 'geolib';
import { useHistory } from 'react-router-dom';

// Distance component
function Distance() {
    let history = useHistory();
    const countries = useSelector(state => state.country.countries);
    const [firstCountry, setFirstCountry] = useState(null);
    const [firstCountryOpts, setFirstCountryOpts] = useState();
    const [secondCountry, setSecondCountry] = useState(null);
    const [secondCountryOpta, setSecondCountryOpts] = useState();
    const [distance, setDistance] = useState("");

    useEffect(() => {
        // if logged out, redirect to login page
        if (localStorage.getItem('loggedIn') === null) {
            history.push('/login');
        }
        loadCountries();
    }, []);
    
    // execute 'calculateDistance()' function after selecting countries
    useEffect(() => {
        if (firstCountry !== null && secondCountry !== null) {
            calculateDistance()
        }
    }, [firstCountry, secondCountry]);

    // load countries from store to select components
    const loadCountries = () => {
        setFirstCountryOpts(
            countries.map((element, index) => {
                return (
                <MenuItem selected={firstCountry === index} value={index}>{element.alpha3Code} ({element.name})</MenuItem>
                );
            })
        );

        setSecondCountryOpts(
            countries.map((element, index) => {
                return (
                <MenuItem selected={secondCountry === index} value={index}>{element.alpha3Code} ({element.name})</MenuItem>
                );
            })
        );
    }

    // calculate distance and update distance label
    const calculateDistance = () => {
        // get first country coordinates
        const country1Lat = countries[firstCountry].latlng[0];
        const country1Lon = countries[firstCountry].latlng[1];
        // get second country coordinates
        const country2Lat = countries[secondCountry].latlng[0];
        const country2Lon = countries[secondCountry].latlng[1];
        // calculate distance
        const distance = getDistance(
            { latitude: country1Lat, longitude: country1Lon },
            { latitude: country2Lat, longitude: country2Lon }
        );

        const kmDistance = distance / 1000
        
        setDistance(kmDistance + " km");
    }

    return (
        <div className="content">
            {/* country select components */}
            <div>
                <FormControl className="selecter-wrapper">
                    <InputLabel id="first-country-label">First Country</InputLabel>
                    <Select labelId="first-country-label" value={firstCountry} onChange={e => setFirstCountry(e.target.value)} className="selecter">
                        {firstCountryOpts}
                    </Select>
                </FormControl>
                <FormControl className="selecter-wrapper">
                    <InputLabel id="second-country-label">Second Country</InputLabel>
                    <Select labelId="second-country-label" value={secondCountry} onChange={e => setSecondCountry(e.target.value)} className="selecter">
                        {secondCountryOpta}
                    </Select>
                </FormControl>
            </div>
            {/* component to display calculated distance */}
            <div className="label-input">Distance <input type="text" value={distance} placeholder="Select countries" disabled /></div>
        </div>
    );
}

export default Distance;