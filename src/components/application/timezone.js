import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';

// Distance component
function Timezone() {
    const timezones = ["UTC-12:00", "UTC-11:00", "UTC-10:00", "UTC-09:00", "UTC-08:00", "UTC-07:00", "UTC-06:00", "UTC-05:00", "UTC-04:00", "UTC-03:00", "UTC-02:00", "UTC-01:00", "UTC", 
        "UTC+01:00", "UTC+02:00", "UTC+03:00", "UTC+04:00", "UTC+05:00", "UTC+06:00", "UTC+07:00", "UTC+08:00", "UTC+09:00", "UTC+10:00", "UTC+11:00", "UTC+12:00", "UTC+13:00", "UTC+14:00"]
    let history = useHistory();
    const countries = useSelector(state => state.country.countries);
    const [timezone1, setTimezone1] = useState(null);
    const [timezone1Opts, setTimezone1Opts] = useState();
    const [timezone2, setTimezone2] = useState(null);
    const [timezone2Opta, setTimezone2Opts] = useState();
    const [tableRows, setTableRows] = useState();

    useEffect(() => {
        // if logged out, redirect to login page
        if (localStorage.getItem('loggedIn') === null) {
            history.push('/login');
        }
        loadTimezones();
    }, []);

    // execute 'findCountries()' function after selecting timezones
    useEffect(() => {
        if (timezone1 !== null && timezone2 !== null) {
            findCountries();
        }
    }, [timezone1, timezone2]);

    // load countries from store to table component
    const loadTimezones = () => {
        setTimezone1Opts(
            timezones.map((element, index) => {
                return (
                <MenuItem selected={timezone1 === index} value={index}>{element}</MenuItem>
                );
            })
        );

        setTimezone2Opts(
            timezones.map((element, index) => {
                return (
                <MenuItem selected={timezone2 === index} value={index}>{element}</MenuItem>
                );
            })
        );
    }

    const findCountries = () => {
        let countryArr = [];
        let timezoneArr = [];
        let timezoneList = null;
        let tz = "";
        let time = "";
        let isValidCountry = false;
        for (let i=0; i<countries.length; i++) {
            // get checking country's timezone list
            timezoneList = countries[i].timezones;
            // loop through timezone list and check whether a match available
            for (let j=0; j<timezoneList.length; j++) {
                tz = timezoneList[j];
                
                for (let z=0; z<timezones.length; z++) {
                    if (tz === timezones[z]) {
                        time = z + "." + tz[7] + tz[8];
                        time = parseFloat(time);
                        // if available add corresponding country and its timezones to arrays and break the inner loop
                        if (timezone1 <= timezone2) {
                            if (timezone1 <= time && time <= timezone2) {
                                countryArr.push(countries[i].alpha3Code + " (" + countries[i].name + ")");
                                let timezoneString = ""
                                for (let k=0; k<timezoneList.length; k++) {
                                    timezoneString = timezoneString + " (" + timezoneList[k] + ") "
                                }
                                timezoneArr.push(timezoneString);
                                isValidCountry = true;
                                break;
                            }
                        } else {
                            if (timezone2 <= time && time <= timezone1) {
                                countryArr.push(countries[i].alpha3Code + " (" + countries[i].name + ")");
                                let timezoneString = ""
                                for (let k=0; k<timezoneList.length; k++) {
                                    timezoneString = timezoneString + " (" + timezoneList[k] + ") "
                                }
                                timezoneArr.push(timezoneString);
                                isValidCountry = true;
                                break;
                            }
                        }
                    }
                }
                if (isValidCountry) {
                    break;
                }
            }
        }
        // update table component rows
        setTableRows(
            countryArr.map((element, index) => {
                return (
                    <tr><td>{element}</td><td>{timezoneArr[index]}</td></tr>
                );
            })
        );
    }

    return (
        <div className="content">
            {/* timezone select components */}
            <div>
                <FormControl className="selecter-wrapper">
                    <InputLabel id="timezone1-label">Select Timezone</InputLabel>
                    <Select labelId="timezone1-label" value={timezone1} onChange={e => setTimezone1(e.target.value)} className="selecter">
                        {timezone1Opts}
                    </Select>
                </FormControl>
                <FormControl className="selecter-wrapper">
                    <InputLabel id="timezone2-label">Select Timezone</InputLabel>
                    <Select labelId="timezone2-label" value={timezone2} onChange={e => setTimezone2(e.target.value)} className="selecter">
                        {timezone2Opta}
                    </Select>
                </FormControl>
            </div>
            {/* country table component */}
            <div className="tbl-container">
                <div className="tbl-wrapper">
                    <table className="tbl">
                        <thead><th>Countries</th><th>Timezones</th></thead>
                        <tbody>{tableRows}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Timezone;