
import React, { useEffect, useState, useMemo } from 'react';
import {fetchDataAndProcess} from '../Data.js';
import RadarGraph from "../widgets/RadarGraphSearch.js";
import "./Search.css";
import "./Tables.css";
import Select from 'react-select';
import { get } from 'firebase/database';

function Search() {
    const [averageData, setAverageData] = useState([]);
    const [matchData, setMatchData] = useState([]); 
    const [team, setTeam] = useState("");
    const [teamData, setTeamData] = useState([]);
    const [teamMatchData, setTeamMatchData] = useState([]);
    const [matchDataType, setMatchDataType] = useState("num");
    const [maxMin, setMaxMin] = useState({});
    const [allTeams, setAllTeams] = useState([]);
    const [teamColors, setTeamColors] = useState([]);

    const radarDataPoints = [
        'Amp',
        'Speaker',
        'Endgame',
        'Teleop',
        'Auto',
        'Human Player',
    ];
    const commentLength = 7;

    useEffect(() => {
        setTimeout(() => {
            fetchDataAndProcess().then((data) => {
                setAverageData(data.teamAverageMap);
                setMatchData(data.bigTeamMap);
                setMaxMin(data.maxMin);
                setAllTeams(getAllTeams(data));
                // console.log(data.bigTeamMap);
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

    useEffect(() => {
        // check if the team list is empty or undefined
        if (!allTeams || allTeams.length === 0) return;
        console.log(allTeams);
        let teamQueryString = "";
        allTeams.forEach((team) => {
            teamQueryString += `team=${team}&`;
        });

        console.log(teamQueryString);
        const url = `https://api.frc-colors.com/v1/team?${teamQueryString}`;
        console.log(url);

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.teams);
                setTeamColors(data.teams);
            })
            .catch((error) => console.error(error));
    }, [team, allTeams]);

    const getAllTeams = (data) => {
        let teams = new Set();
        data.teamAverageMap.forEach((value, key) => {
            teams.add(key);
        });
        console.log(teams);
        return teams;
    };

    const emptyData = (data) => {
        return data === undefined || data[0] === undefined || data[0].length === 0
    }
    
    const getTeamColor = useMemo(() => {
        return (team) => {
            if (teamColors === undefined || teamColors.length === 0)
                return 'black';
            console.log(teamColors);
            console.log(team);
            try {
                if (!(teamColors[team] && teamColors[team].colors))
                    return 'grey';
                const teamColor = teamColors[team]['colors']['primaryHex'];
                console.log(teamColor);
                return teamColor;
            } catch (error) {
                console.error(error);
                return 'black';
            }
        };
    }, [teamColors]);

    const selecterConfig = {

        control: (base) => ({
            ...base,
            color: 'black',
            width: 300,
            height: 'auto',
            fontSize: 20,
            margin: '23% 0 0 0',
            backgroundColor: '--background-color',
        }),

        singleValue: (styles, { data }) => {
            return { ...styles, color: "white", backgroundColor: getTeamColor(data.value), borderRadius: 5, padding: 2, width: "30%" };
        },

        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? null
                    : isSelected
                      ? getTeamColor(data.value)
                      : isFocused
                        ? getTeamColor(data.value)
                        : null,
                // color based on whether the option is selected and is focused
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                      ? 'white'
                      : isFocused
                        ? 'white'
                        : 'black',

                cursor: isDisabled ? 'not-allowed' : 'default'
            };
        },
    };

    const renderSelect = () => {
        return (
            <Select
                options={Array.from(allTeams).map((team) => {
                    let teamColor;
                    if (Array.isArray(teamColors)) {
                        teamColors.map((color) => {
                            if (color.team === team) {
                                teamColor = color;
                            }
                            return color;
                        });
                    }
                    return {
                        value: team,
                        label: team,
                        color: teamColor ? teamColor.colors.primaryHex : '#000'
                    };
                })}
                onChange={(selected) => {setTeam(selected.value)}}
                styles={selecterConfig}
                isMulti={false} // Set isMulti to false for single selection
                defaultValue={team} // Pass the selectedTeam value here
            />
        );
    };

    // console.log(teamMatchData);

    if (emptyData(teamData) || emptyData(teamMatchData)) {
        return (
            <div className="search">
                <div className="search-bar">
                    <div className="search-input">{renderSelect()}</div>
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
        console.log(teamData);
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
                <div className="search-input">{renderSelect()}</div>
            </div>  

            <div className="team-stats">
                <div className="team-average-header">Averages</div>
                <div className="container">
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

export default Search