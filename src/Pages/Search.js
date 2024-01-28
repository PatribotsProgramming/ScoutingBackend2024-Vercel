
import React, { useEffect, useState } from "react";
import {fetchDataAndProcess} from '../Data.js'
import "./Search.css";

function Search() {
    const [data, setData] = useState([]);
    const [team, setTeam] = useState("");
    const [value, setValue] = useState("");
    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            fetchDataAndProcess().then((data) => {
                setData(data.teamAverageMap);
            });
        }, 1000);
    }, []);

    useEffect(() => {
        if (data.size !== 0 && data.size !== undefined) {
            setTeamData(data.get(team));
        }
        // eslint-disable-next-line
    }, [team]);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSearch = () => {
        setTeam(value);
    }

    const onKeyDownHandler = e => {
        if (e.keyCode === 13) {
            handleSearch();
        }
    };

    if (teamData === undefined || teamData === null || teamData[0] === undefined || teamData[0].length === 0) {
        return (
            <div className="search">
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Team Number" 
                        className="search-input"
                        onChange={handleChange}
                        onKeyDown={onKeyDownHandler}
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
                    onKeyDown={onKeyDownHandler}
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>  

            <div className="team-stats">
                {teamData[0].map((category, index) => (
                    <div key={category} className="data-point">
                        {teamData[0][index] + ": " + (Math.round(teamData[1][index] * 100) / 100)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Search;