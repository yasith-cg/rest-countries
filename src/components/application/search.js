import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Search component
function Search() {
    let history = useHistory();
    const countries = useSelector(state => state.country.countries);
    const [tableRows, setTableRows] = useState();
    const [tableRowsCopy, setTableRowsCopy] = useState();
    const [countryList, setCountryList] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        // if logged out, redirect to login page
        if (localStorage.getItem('loggedIn') === null) {
            history.push('/login');
        }
        loadCountries();
    }, []);

    // execute 'searchCountries()' function to search
    useEffect(() => {
        searchCountries(search);
    }, [search]);

    // load countries from store to table component
    const loadCountries = () => {
        setTableRows(
            countries.map((element, index) => {
                return (
                    <tr><td>{element.name}</td></tr>
                );
            })
        );
        
        // keep a copy as same as 'tableRows' state to update table rows for searching process
        setTableRowsCopy(
            countries.map((element, index) => {
                return (
                    <tr><td>{element.name}</td></tr>
                );
            })
        );

        let countryArr = [];

        for (let i=0; i<countries.length; i++) {
            countryArr.push(countries[i].name.toLowerCase());
        }

        setCountryList(countryArr);
    }

    // Searching functionality
    const searchCountries = searchString => {
        searchString = searchString.toLowerCase();
        if (searchString !== "") {
            let rows = [];
        for (let i=0; i<tableRowsCopy.length; i++) {
            let item = countryList[i];
            let match = false;
            let p = 0;
            while (match === false && p <= (item.length-searchString.length)) {
                let itemString = "";
                let count = 0;
                for (let j=p; count<searchString.length; j++) {
                    itemString = itemString + item[j]
                    count++;
                }
                if (itemString === searchString) {
                    match = true;
                    rows.push(tableRowsCopy[i]);
                }
                p++;
            }
        }
        setTableRows(rows);
        } else {
            setTableRows(tableRowsCopy);
        }
    }

    return (
        <div className="content">
            {/* search input component */}
            <div><input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" /></div>
            {/* table component to display countries */}
            <div className="tbl-container">
                <div className="tbl-wrapper">
                    <table className="tbl">
                        <thead><th>Countries</th></thead>
                        <tbody>{tableRows}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Search;