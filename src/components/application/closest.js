import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getDistance } from 'geolib';

// Closest component
function Closest() {
    let history = useHistory();
    const countries = useSelector(state => state.country.countries);
    const [country, setCountry] = useState(null);
    const [countryOpts, setCountryOpts] = useState();
    const [closestCountry, setClosestCountry] = useState();

    useEffect(() => {
        // if logged out, redirect to login page
        if (localStorage.getItem('loggedIn') === null) {
            history.push('/login');
        }
        loadCountries();
    }, []);

    // execute 'findClosestCountry()' function after selecting country
    useEffect(() => {
        if (country !== null) {
            findClosestCountry()
        }
    }, [country]);

    // load countries from store to select component
    const loadCountries = () => {
        setCountryOpts(
            countries.map((element, index) => {
                return (
                <MenuItem selected={country === index} value={index}>{element.alpha3Code} ({element.name})</MenuItem>
                );
            })
        );
    }

    const findClosestCountry = () => {
        // get selected country coordinates
        const selectedCountryLat = countries[country].latlng[0];
        const selectedCountryLon = countries[country].latlng[1];

        // get neighbour countries
        const borders = countries[country].borders;

        let alphaCode = "";
        let isBorder = false;
        let checkCountryLat = "";
        let checkCountryLon = "";
        let distance = 0;
        let distanceData = null;

        // loop through countries
        for (let i=0; i<countries.length; i++) {
            // check whether if not the same country
            if (i !== country) {
                alphaCode = countries[i].alpha3Code;
                
                for (let j=0; j<borders.length; j++) {
                    // check whether the if not in the neighbour country list
                    if (alphaCode === borders[j]) {
                        isBorder = true;
                        break;
                    }
                }
                // if not a neighbour country then calculate distance
                if (!isBorder) {
                    // get checking country coordinates
                    checkCountryLat = countries[i].latlng[0];
                    checkCountryLon = countries[i].latlng[1];
                    
                    if (typeof checkCountryLat === "undefined" || typeof checkCountryLon === "undefined") {
                        continue;
                    }

                    // calculate distance
                    distance = getDistance(
                        { latitude: selectedCountryLat, longitude: selectedCountryLon },
                        { latitude: checkCountryLat, longitude: checkCountryLon }
                    );
                    
                    if (distanceData !== null) {
                        // if distance is lower than previously assigned distance, then assign new values
                        if (distance < distanceData.distance) {
                            distanceData.index = i;
                            distanceData.distance = distance;
                        }
                    } else {
                        // initial data assign
                        distanceData = {
                            index: i,
                            distance: distance
                        };
                    }
                } else {
                    isBorder = false;
                }
            }
        }

        setClosestCountry(countries[distanceData.index].alpha3Code+" ("+countries[distanceData.index].name+")");
    }

    return (
        <div className="content">
            {/* country select component */}
            <div>
                <FormControl className="selecter-wrapper">
                    <InputLabel id="country-label">Select Country</InputLabel>
                    <Select labelId="country-label" value={country} onChange={e => setCountry(e.target.value)} className="selecter">
                        {countryOpts}
                    </Select>
                </FormControl>
            </div>
            {/* component to display result */}
            <div className="label-input">Closest Country <input type="text" value={closestCountry} placeholder="Select countries" disabled /></div>
        </div>
    );
}

export default Closest;