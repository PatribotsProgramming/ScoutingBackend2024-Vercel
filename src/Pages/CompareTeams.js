
import React, { useEffect, useState } from "react";
import {fetchDataAndProcess} from '../Data.js';
import { getMaxMin } from '../Data.js';
import RadarGraph from "../widgets/RadarGraph.js";
import "./Search.css";
import "./Tables.css";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis } from "recharts";

function Compare() {
    const [averageData, setAverageData] = useState([]);
    const [matchData, setMatchData] = useState([]); 
    const [team, setTeam] = useState("");
    const [value, setValue] = useState("");
    const [teamData, setTeamData] = useState([]);
    const [teamMatchData, setTeamMatchData] = useState([]);
    const [matchDataType, setMatchDataType] = useState("num");
    const [maxMin, setMaxMin] = useState({});
    const [teamList, setTeamList] = useState([]);

    const radarDataPoints = ["Amp Auto", "Speaker Auto", "Amp Teleop", "Speaker Teleop", "Amped Speaker", "Endgame"];
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
        let allTeamData = [];
        let allTeamMatchData = [];
        teamList.forEach((team) => {
            console.log(team);
            let thisTeamData;
            let thisTeamMatchData;

            if (averageData.size !== 0 && averageData.size !== undefined) {
                thisTeamData = averageData.get(team);
                // setTeamData(averageData.get(team));
            }
            if (matchData.size !== 0 && matchData.size !== undefined) {
                thisTeamMatchData = matchData.get(team);
                // setTeamMatchData(matchData.get(team));
            }
            allTeamData.push(thisTeamData);
            allTeamMatchData.push(thisTeamMatchData);

            console.log(allTeamData);
            console.log(allTeamMatchData);
        });
        
        setTeamData(allTeamData);
        setTeamMatchData(allTeamMatchData);
        // eslint-disable-next-line
    }, [team]);

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSearch = () => {
        setTeam(value);
        // if the team exists, remove it from the list of teams, otherwise add it
        if (teamList.includes(value)) {
            setTeamList(teamList.filter((team) => team !== value));
            console.log(teamList.filter((team) => team !== value))
        } else {
            setTeamList([...teamList, value]);
            console.log([...teamList, value])
        }
        setValue("");
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

        for (let j = 0; j < teamData.length; j++) {
            let team = teamData[j];

            for (let i = 1; i < team.length; i++) {
                if (isRadarPoint(team[0][i])) {
                    let min = maxMin.get(team[0][i])[0];
                    let max = maxMin.get(team[0][i])[1];
                    let val = ((team[1][i] - min) / (max - min)) * 100;
                    arr.push({ key: team[0][i], value: val });
                }
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

    const CustomizedAxisTick = props => {
        const { x, y, payload } = props;
        let label = payload.value;
        console.log(label);
        if (label.length > 7) { // Change this value to adjust the maximum length
            label = label.slice(0, 10) + '...'; // Truncate and add ellipsis
        }

        return (
            <g transform={`translate(${x},${y})`}>
                <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
                    {label}
                </text>
            </g>
        );
    };

    function createDataObject(headers, stats) {
        let dataArray = [];
        for(let i = 0; i < stats.length; i++) {
            let dataObject = {name: headers[i], value: stats[i]};
            for(let j = 0; j < stats[i].length; j++) {
                dataObject[headers[j+1]] = isNaN(stats[i][j]) ? stats[i][j] : Math.round(stats[i][j] * 100) / 100;
            }
            dataArray.push(dataObject);
        }
        return dataArray;
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
                    value={value}
                    onChange={handleChange}
                    onKeyDown={onKeyDownHandler}
                />
                <button className="search-button" onClick={handleSearch}>Search</button>
            </div>  

            <div className="team-stats">
                <div className="team-stat-header">{team} Stats</div>
                <div className="team-average-header">Averages</div>
                <div className="bar-chart">
                    {console.log(convertRadar())}
                    <BarChart
                        width={1400}
                        height={400}
                        data={convertRadar()}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="key" tick={<CustomizedAxisTick />} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill="#8884d8" />
                        <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
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
            </div>
        </div>
    );
}

export default Compare;