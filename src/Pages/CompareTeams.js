import React, { useEffect, useState } from 'react';
import { fetchDataAndProcess } from '../Data.js';
import { getMaxMin } from '../Data.js';
import RadarGraph from '../widgets/RadarGraph.js';
import './Search.css';
import './Tables.css';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Rectangle,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import MyBarChart from '../widgets/MyBarChart.js';

function Compare() {
    const [averageData, setAverageData] = useState([]);
    const [matchData, setMatchData] = useState([]);
    const [team, setTeam] = useState('');
    const [value, setValue] = useState('');
    const [teamData, setTeamData] = useState([]);
    const [teamMatchData, setTeamMatchData] = useState([]);
    const [maxMin, setMaxMin] = useState({});
    const [teamList, setTeamList] = useState([]);

    const radarDataPoints = [
        'Amp Auto',
        'Speaker Auto',
        'Amp Teleop',
        'Speaker Teleop',
        'Amped Speaker',
        'Endgame',
    ];

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
    }, [team]);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleSearch = () => {
        setTeam(value);
        // if the team exists, remove it from the list of teams, otherwise add it
        if (teamList.includes(value)) {
            setTeamList(teamList.filter((team) => team !== value));
            console.log(teamList.filter((team) => team !== value));
        } else {
            setTeamList([...teamList, value]);
            console.log([...teamList, value]);
        }
        setValue('');
    };

    // searches on press of enter key
    const onKeyDownHandler = (e) => {
        if (e.keyCode === 13) {
            handleSearch();
        }
    };

    const emptyData = (data) => {
        return (
            data === undefined || data[0] === undefined || data[0].length === 0
        );
    };

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
                    <button className="search-button" onClick={handleSearch}>
                        Search
                    </button>
                </div>
                <div className="team-stats">No Data</div>
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
    };

    // selects data points from teamData and formats them for
    // the radar chart
    const convertRadar = () => {
        let arr = [];
        for (let i = 1; i < teamData[0][0].length; i++) {
            if (isRadarPoint(teamData[0][0][i])) {
                let categoryObj = { key: teamData[0][0][i] };
                for (let j = 0; j < teamData.length; j++) {
                    let min = maxMin.get(teamData[j][0][i])[0];
                    let max = maxMin.get(teamData[j][0][i])[1];
                    let val = ((teamData[j][1][i] - min) / (max - min)) * 100;
                    categoryObj[`value${j + 1}`] = val;
                }
                arr.push(categoryObj);
            }
        }
        console.log(arr);
        return arr;
    };

    const returnTeamString = () => {
        let str = '';
        for (let i = 0; i < teamList.length; i++) {
            str += teamList[i];
            if (i !== teamList.length - 1) {
                str += ' vs. ';
            }
        }
        return str;
    };

    const colorConfig = {
        team1: {
            fill: '#d4af37',
            activeBar: <Rectangle fill="#d4af37" width={10} height={10} />,
        },
        team2: {
            fill: '#3AD437',
            activeBar: <Rectangle fill="#3AD437" width={10} height={10} />,
        },
        team3: {
            fill: '#D43737',
            activeBar: <Rectangle fill="#D43737" width={10} height={10} />,
        }
    };

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
                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
            </div>

            <div className="team-stats">
                <div className="team-stat-header">
                    {returnTeamString()} Stats
                </div>
                <div className="team-average-header">Averages</div>
                <div className="bar-chart">
                    <MyBarChart
                        width={1000}
                        height={250}
                        data={convertRadar()}
                        margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
                        bar1Config={colorConfig.team1}
                        bar2Config={colorConfig.team2}
                        bar3Config={colorConfig.team3}
                    />
                </div>
                <div className="radar">
                    <RadarGraph
                        data={convertRadar()}
                        angleKey="key"
                        radiusDomain={[0, 100]}
                        radar1={{
                            name: teamList[0],
                            dataKey: 'value1',
                            stroke: colorConfig.team1.fill,
                            fill: colorConfig.team1.fill,
                            fillOpacity: 0.6,
                        }}
                        radar2={{
                            name: teamList[1],
                            dataKey: 'value2',
                            stroke: colorConfig.team2.fill,
                            fill: colorConfig.team2.fill,
                            fillOpacity: 0.6,
                        }}
                        radar3={{
                            name: teamList[2],
                            dataKey: 'value3',
                            stroke: colorConfig.team3.fill,
                            fill: colorConfig.team3.fill,
                            fillOpacity: 0.6,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Compare;
