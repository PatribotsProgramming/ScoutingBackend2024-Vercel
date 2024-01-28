
import React, { useEffect, useState } from "react";
import {fetchDataAndProcess} from '../Data.js'
import {getTeamData} from '../Data.js';
import {getTeamAverage} from '../Data.js';
import "./Search.css";

function Search() {
    // const [data, setData] = useState([]);
    const [team, setTeam] = useState("");
    const [value, setValue] = useState("");
    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
       setTeamData(getTeamAverage(team))
    }, [team]);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSearch = () => {
        setTeam(value);
    }

    if (teamData === undefined || teamData === null || teamData[0] === undefined || teamData[0].length === 0) {
        return (
            <div className="search">
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Team Number" 
                        className="search-input"
                        onChange={handleChange}
                    />
                    <button className="search-button" onClick={handleSearch}>Search</button>
                </div>
                <div className="team-stats">
                    No Data
                </div>
            </div>
        );
    }

    return (
        <div className="search">
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Team Number" 
                    className="search-input"
                    onChange={handleChange}
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>  

            <div className="team-stats">
                {teamData[0].map((category, index) => (
                    <div key={category}>
                        {teamData[0][index] + ": " + teamData[1][index]}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;