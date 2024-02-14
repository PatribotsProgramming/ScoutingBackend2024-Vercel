import React, { useEffect, useState, useMemo } from 'react';
import { fetchDataAndProcess } from '../Data.js';
import { getMaxMin } from '../Data.js';
import RadarGraph from '../widgets/RadarGraph.js';
import './CompareTeams.css';
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
import Select from 'react-select';

function Compare() {
    const [averageData, setAverageData] = useState([]);
    const [matchData, setMatchData] = useState([]);
    const [allTeams, setAllTeams] = useState([]);
    const [teamData, setTeamData] = useState([]);
    const [teamMatchData, setTeamMatchData] = useState([]);
    const [maxMin, setMaxMin] = useState({});
    const [teamColors, setTeamColors] = useState([]);
    const [teamList, setTeamList] = useState([]);
    const [singleChartMode, setSingleChartMode] = useState(true);

    const radarDataPoints = [
        'Amp Auto',
        'Speaker Auto',
        'Amp Teleop',
        'Speaker Teleop',
        'Amped Speaker',
        'Endgame',
    ];

    const getAllTeams = (data) => {
        let teams = new Set();
        data.teamAverageMap.forEach((value, key) => {
            teams.add(key);
        });
        return teams;
    };

    // make a get request to https://api.frc-colors.com/v1/team?team=581&team=254&team=1678
    // to get the team colors
    useEffect(() => {
        // check if the team list is empty
        if (teamList.length === 0) return;
        const teamQueryString = teamList
            .map((team) => `team=${team}`)
            .join('&');
        const url = `https://api.frc-colors.com/v1/team?${teamQueryString}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.teams);
                setTeamColors(data.teams);
            })
            .catch((error) => console.error(error));
    }, [teamList]);

    useEffect(() => {
        setTimeout(() => {
            fetchDataAndProcess().then((data) => {
                setAllTeams(getAllTeams(data));
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
    }, [teamList]);

    const handleSearch = (e) => {
        // if the team exists, remove it from the list of teams, otherwise add it
        if (teamList.includes(e)) {
            setTeamList(teamList.filter((team) => team !== e));
            console.log(teamList.filter((team) => team !== e));
        } else {
            setTeamList([...teamList, e]);
            console.log([...teamList, e]);
        }
    };

    const emptyData = (data) => {
        return (
            data === undefined || data[0] === undefined || data[0].length === 0
        );
    };

    // console.log(teamMatchData);

    const updateAfterSelect = (selectedOption) => {
        console.log(selectedOption);
        setTeamList(selectedOption.map((option) => option.value));
        console.log(selectedOption.map((option) => option.value));
        selectedOption.map((option) => handleSearch(option.value));
    };

    const getTeamColor = useMemo(() => {
        return (team) => {
            if (teamColors.length === 0) return 'black';
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
            width: 300,
            height: 'auto',
            fontSize: 20,
            margin: "23% 0 0 0",
            backgroundColor: '--background-color',
        }),

        multiValue: (base, { data }) => ({
            ...base,
            backgroundColor: `${getTeamColor(data.value)}70`, // Add alpha value (80) for transparency
            color: 'white',
        }),

        multiValueLabel: (base) => ({
            ...base,
            color: 'white',
        }),

        multiValueRemove: (base) => ({
            ...base,
            color: 'white',
            ':hover': {
                backgroundColor: 'black',
                color: 'white',
            },
        }),

        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? null
                    : isSelected
                    ? 'black'
                    : isFocused
                    ? 'black'
                    : null,
                // color based on whether the option is selected and is focused
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                    ? 'white'
                    : isFocused
                    ? 'white'
                    : 'black',

                cursor: isDisabled ? 'not-allowed' : 'default',
                ':active': {
                    ...styles[':active'],
                    backgroundColor:
                        !isDisabled && (isSelected ? data.color : 'black'),
                },
            };
        },
    };

    const renderSelect = () => {
        return (
            <Select
                options={Array.from(allTeams).map((team) => ({
                    value: team,
                    label: team,
                }))}
                isMulti
                onChange={(selectedOption) => {
                    selectedOption.length <= 6
                        ? updateAfterSelect(selectedOption)
                        : null;
                }}
                closeMenuOnSelect={false}
                styles={selecterConfig}
                value={teamList.map((team) => ({ value: team, label: team }))}
            />
        );
    };

    if (emptyData(teamData) || emptyData(teamMatchData)) {
        return (
            <div className="search">
                <div className="search-bar">{renderSelect()}</div>
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
    const convertForReCharts = () => {
        let arr = [];
        for (let i = 1; i < teamData[0][0].length; i++) {
            if (isRadarPoint(teamData[0][0][i])) {
                let categoryObj = { key: teamData[0][0][i] };
                for (let j = 0; j < teamData.length; j++) {
                    let min = maxMin.get(teamData[j][0][i])[0];
                    let max = maxMin.get(teamData[j][0][i])[1];
                    let val = ((teamData[j][1][i] - min) / (max - min)) * 100;
                    categoryObj[teamList[j]] = val; // Use team number as key
                }
                arr.push(categoryObj);
            }
        }
        console.log(arr);
        return arr;
    };

    const colors = [
        '#d4af37',
        '#3AD437',
        '#D43737',
        '#3776D4',
        '#D43776',
        '#76D437',
        '#D47637',
        '#3737D4',
        '#D4D437',
        '#37D4D4',
    ]; // Add more colors if needed

    const colorConfig = colors.reduce((config, color, index) => {
        config[`team${index + 1}`] = {
            fill: color,
            activeBar: <Rectangle fill={color} width={10} height={10} />,
        };
        return config;
    }, {});

    return (
        <div className="search">
            <div className="search-bar">{renderSelect()}</div>
            <div className="team-stats">
                <div className="bar-chart">
                    <MyBarChart
                        width={1000}
                        height={250}
                        data={convertForReCharts()}
                        margin={{ top: 5, right: 30, left: 20, bottom: 50 }}
                        barConfigs={teamList.map(
                            (team, index) => colorConfig[`team${index + 1}`]
                        )}
                        teamList={teamList}
                        teamColors={teamColors}
                    />
                </div>
                <button onClick={() => setSingleChartMode(!singleChartMode)}>
                    {singleChartMode ? 'Single Chart' : 'Multiple Charts'}
                </button>
                {singleChartMode ? (
                    <div className="radar-ct">
                        <RadarGraph
                            data={convertForReCharts()}
                            angleKey="key"
                            radiusDomain={[0, 100]}
                            radars={teamList
                                .slice(0, 10)
                                .map((team, index) => ({
                                    name: team,
                                    dataKey: team,
                                    stroke: colorConfig[`team${index + 1}`]
                                        .fill,
                                    fill: colorConfig[`team${index + 1}`].fill,
                                    fillOpacity: 0.6,
                                }))}
                        />
                    </div>
                ) : (
                    <div className="radar-many">
                        {teamList.map((team, index) => (
                            <RadarGraph
                                key={index}
                                data={convertForReCharts().filter(
                                    (data) => data[team]
                                )}
                                angleKey="key"
                                radiusDomain={[0, 100]}
                                radars={[
                                    {
                                        name: team,
                                        dataKey: team,
                                        stroke: colorConfig[`team${index + 1}`]
                                            .fill,
                                        fill: colorConfig[`team${index + 1}`]
                                            .fill,
                                        fillOpacity: 0.6,
                                    },
                                ]}
                            />
                        ))}

                        <RadarGraph
                            data={convertForReCharts()}
                            angleKey="key"
                            radiusDomain={[0, 100]}
                            radars={teamList
                                .slice(0, 10)
                                .map((team, index) => ({
                                    name: team,
                                    dataKey: team,
                                    stroke: colorConfig[`team${index + 1}`]
                                        .fill,
                                    fill: colorConfig[`team${index + 1}`].fill,
                                    fillOpacity: 0.6,
                                }))}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Compare;
