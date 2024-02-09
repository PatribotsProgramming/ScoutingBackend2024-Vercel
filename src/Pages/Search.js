
import React, { useEffect, useState } from "react";
import {fetchDataAndProcess} from '../Data.js';
import { getMaxMin } from '../Data.js';
import RadarGraph from "../widgets/RadarGraph.js";
import "./Search.css";
import "./Tables.css";

function Search() {
    const [averageData, setAverageData] = useState([]);
    const [matchData, setMatchData] = useState([]); 
    const [team, setTeam] = useState("");
    const [value, setValue] = useState("");
    const [teamData, setTeamData] = useState([]);
    const [teamMatchData, setTeamMatchData] = useState([]);
    const [matchDataType, setMatchDataType] = useState("num");
    const [maxMin, setMaxMin] = useState({});

    const radarDataPoints = ["Amp Auto", "Speaker Auto", "Amp Teleop", "Speaker Teleop", "Driving", "Human Player"];
    const commentLength = 7;

    useEffect(() => {
        setTimeout(() => {
            fetchDataAndProcess().then((data) => {
                setAverageData(data.teamAverageMap);
                setMatchData(data.bigTeamMap);
                setMaxMin(data.maxMin);
            });
        }, 1000);
    }, []);

    useEffect(() => {
        if (averageData.size !== 0 && averageData.size !== undefined) {
            setTeamData(averageData.get(team));
        }
        if (matchData.size !== 0 && matchData.size !== undefined) {
            setTeamMatchData(matchData.get(team));
        }
        // eslint-disable-next-line
    }, [team]);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSearch = () => {
        setTeam(value);
    }

    // searches on press of enter key
    const onKeyDownHandler = (e) => {
        if (e.keyCode === 13) {
            handleSearch();
        }   
    };

    const emptyData = (data) => {
        return data === undefined || data[0] === undefined || data[0].length === 0
    }

    // console.log(teamMatchData);

    if (emptyData(teamData) || emptyData(teamMatchData)) {
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

    // checks data point string against the data point array to
    // see if the data point should be on the radar chart
    const isRadarPoint = (dataPoint) => {
        for (let i = 0; i < radarDataPoints.length; i++) {
            if (dataPoint === radarDataPoints[i]) return true;
        }
        return false;
    }

    // selects data points from teamData and formats them for 
    // the radar chart
    const convertRadar = () => {
        let arr = [];
        for (let i = 1; i < teamData[0].length; i++) {
            if (isRadarPoint(teamData[0][i])) {
                let min = maxMin.get(teamData[0][i])[0];
                let max = maxMin.get(teamData[0][i])[1];
                let val = ((teamData[1][i] - min) / (max - min)) * 100;
                arr.push({key: teamData[0][i], value: val})
            }
        }
        // console.log(arr);
        return arr;
    }

    // returns the section of the match data to display based on if the current data
    // type is either numbers or comments
    const matchContent = (matches) => {
        if (matchDataType === "num") {
            return matches.slice(commentLength);
        }
        return matches.slice(1, commentLength);
    }

    // changes match data type to either num or comment
    const handleSelectChange = (e) => {
        setMatchDataType(e.target.value);
    }

    let headers = teamData[0].slice(1);
    let stats = teamData[1].slice(1);

    let matchHeads = teamMatchData[0];
    let matchStats = teamMatchData.slice(1);

    // console.log(convertRadar());

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
                <div className="team-stat-header">{team} Stats</div>
                <div className="team-average-header">Averages</div>
                <div className="average-stats">
                    <table className="table">
                        {/* Render headers */}
                        <thead className="header">
                            <tr>
                                {headers.map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        
                        {/* Render content */}
                        <tbody>
                            <tr>
                                {stats.map((cellData, index) => (
                                    <td key={index}>
                                        {(isNaN(cellData)) ? cellData : Math.round(cellData * 100) / 100}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                    </div>
                <div className="radar">
                    <RadarGraph
                        data={convertRadar()}
                        angleKey="key"
                        radiusDomain={[0, 100]}
                        radar1={{
                            name: {team},
                            dataKey: "value",
                            stroke: "#d4af37",
                            fill: "#d4af37",
                            fillOpacity: 0.6,
                        }}
                    />
                </div>
                <div className="team-match-header">Matches</div>
                <div className="match-content-selector">
                    <select className="selector" onChange={handleSelectChange}>
                        <option value="num">
                            Numbers
                        </option>
                        <option value="comment">
                            Comments
                        </option>
                    </select>
                </div>
                <div className="match-stats-container">
                    <table className="table">
                        {/* Render headers */}
                        <thead className="header">
                            <tr>
                                {matchContent(matchHeads).map((header, index) => (
                                    <th key={index}>{header}</th>
                                ))}
                            </tr>
                        </thead>
                        
                        {/* Render data */}
                        <tbody>
                            {matchStats.map((rowData, rowIndex) => (
                                <tr key={rowIndex}>
                                    {matchContent(rowData).map((cellData, cellIndex) => (
                                        <td key={cellIndex}>{cellData}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Search;