import { data } from "./SampleData.js";
import { Chart } from "react-google-charts";
import { getAllData } from "./widgets/JsonData.js";
import { fetchData } from "./SampleData.js";
import { async } from "@firebase/util";
//const data = getAllData();

const eventCode = "2024Testing";    

let rawData;
let commentData;
let numData;
let commentTeamMap;
let numTeamMap;
let bigTeamMap;
let allData;
let teamAverageMap;

let rawDataMap;
// Use an async function to fetch and process your data
// Working:
export const fetchDataAndProcess = async () => {
    const data = await getAllData();
    rawData = JSON.parse(data)["scouting"][eventCode];
    console.log(rawData);
    commentData = resortColumnByPoint(
        convertCommentsToTableForm(rawData),
        "Team",
        0
    );
    numData = convertNumDataToTableForm(rawData);
    console.log(numData);
    // numData = resortColumnByPoint(
    //     convertNumDataToTableForm(rawData),
    //     "Team",
    //     0
    // );
    // console.log(numData);
    

    commentTeamMap = convertToTeamMap(commentData);

    numTeamMap = convertToTeamMap(numData);
    console.log(numTeamMap);
    console.log(getTeamAverage("4738"));
    console.log(numTeamMap);
    console.log(getTeamAverageMap());
    teamAverageMap = getTeamAverageMap();
    allData = resortColumnByPoint(convertAllToTableForm(rawData), "Team", 0);
    bigTeamMap = convertToTeamMap(allData);
    rawDataMap = convertTableToMap(numData);

    // make a map of all the data variables
    console.log(numTeamMap);
    console.log(allData);
    console.log(bigTeamMap);
    console.log(numData);
    console.log(convertTableToMap(numData));
    return {
        rawData: rawData,
        commentData: commentData,
        commentDataMap: convertTableToMap(commentData),
        numData: numData,
        numDataMap: convertTableToMap(numData),
        commentTeamMap: commentTeamMap,
        numTeamMap: numTeamMap,
        bigTeamMap: bigTeamMap,
        allData: allData,
        teamAverageMap: teamAverageMap,
        rawDataMap: rawDataMap
    };
};


const getTeamData = (team) => {
    return bigTeamMap.get(team);
};
const getTeamNumData = (team) => {
    console.log(numTeamMap);
    if (numTeamMap.get(team) == undefined) {
        return [[], []];
    }
    return numTeamMap.get(team);
};
const getTeamCommentData = (team) => {
    return commentTeamMap.get(team);
};

// Working
function convertToTableForm(data, datatype) {
    // overall data structure
    let table = [];

    // rows of the table
    let row = getIndividualDatapoints(data);
    row[0].push("Team");
    row[1].push("Team");

    // pushes the first row to the table

    if (datatype == "comments") {
        table.push(row[0]);
    } else {
        table.push(row[1]);
    }
    console.log(table);
    console.log(data);
    const matches = Object.keys(data);

    for (let i = 1; i <= matches.length; i++) {
        const matchData = data[matches[i - 1]];
        const bots = Object.keys(matchData);

        for (let j = 0; j < Object.keys(matchData).length; j++) {
            row = [];
            const botData = matchData[bots[j]][datatype];
            console.log(botData);
            const dataKeys = Object.keys(botData);
            for (let k = 0; k < dataKeys.length; k++) {
                row.push(botData[dataKeys[k]]);
            }
            console.log(bots[j]);
            let teamNameStart = 0;
            for (let i = 0; i < bots[j].length; i++) {
                if (bots[j][i] == '-') {
                    teamNameStart = i + 1;
                }
            }
            row.push(bots[j].substring(teamNameStart, bots[j].length));
            table.push(row);
        }
    }
    console.log(table);

    return table;
}
// Working: 
function convertCommentsToTableForm(data) {
    return convertToTableForm(data, "comments");
}
// Working: 
function convertNumDataToTableForm(data) {
    console.log(convertToTableForm(data, "data"));
    return convertToTableForm(data, "data");
}


// Working: 
function convertAllToTableForm(data) {
    let comments = convertCommentsToTableForm(data);
    let numData = convertNumDataToTableForm(data);
    let table = [];
    table.push([comments[0], numData[0]].flat());
    table[0].pop();
    console.log(table);
    for (let i = 0; i < comments.length - 1; i++) {
        table.push([comments[i + 1], numData[i + 1]].flat());
        table[i + 1].pop();
    }
    console.log(table);
    return table;
}


// Working but need to make easier to use:
function resortColumn(data, columnInitial, columnGoal) {
    let table = [];
    let row = [];
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        row = [...data[i]];
        let temp = row[columnInitial];
        row[columnInitial] = row[columnGoal];
        row[columnGoal] = temp;
        table.push(row);
    }
    console.log(table);
    return table;
}


// Working but need to make easier to use:
function resortColumnByPoint(data, point, columnGoal) {
    console.log(data);
    for (let i = 0; i < data[0].length; i++) {
        if (data[0][i] == point) {
            console.log(resortColumn(data, i, columnGoal));
            return resortColumn(data, i, columnGoal);
        }
    }
}
function convertTableToMap(data) {
    let mapArr = [];
    

    for (let i = 1; i < data.length; i++) {
        let map = {};
        console.log(data[i]);
        for (let j = 0; j < data[i].length; j++) {
            console.log(j);
            console.log(data[0][j]);
            map[data[0][j]] = data[i][j];
        }
        mapArr.push(map);
    }
    console.log(mapArr);
    return mapArr;
    
}

// Working:
function getIndividualDatapoints(data) {

    let datapoints = [[], []];


    //gets all the matches
    let matchKeys = Object.keys(data);
    console.log(matchKeys);

    // if there are no matches, return empty table
    if (matchKeys.length == 0) {
        return dataPoints;
    }
    
    // gets all the data points using the data from the first bot in the first match
    // matchKeys[0] is the first match
    // Object.keys(data[matchKeys[0]])[0] is the first bot in the first match
    
    let botKeys = Object.keys(data[matchKeys[0]]);
    
    let commentPoints = Object.keys(
        data[matchKeys[0]][botKeys[0]]["comments"]
    );

    
    let numDataPoints = Object.keys(
        data[matchKeys[0]][botKeys[0]]["data"]
    );

    // pushes those data points to the first row of the table (the header)
    for (let i = 0; i < commentPoints.length; i++) {
        datapoints[0].push(commentPoints[i]);
    }
    for (let i = 0; i < numDataPoints.length; i++) {
        datapoints[1].push(numDataPoints[i]);
    }
    console.log(datapoints);
    return datapoints;
}


// Working: 
function convertToTeamMap(data, datatype) {
    let teamMap = new Map();
    const points = getIndividualDatapoints(rawData);
    for (let i = 1; i < data.length; i++) {
        if (!teamMap.has(data[i][0])) {
            teamMap.set(data[i][0], [data[0], data[i]]);
        } else {
            teamMap.get(data[i][0]).push(data[i]);
        }
    }
    console.log(teamMap);
    return teamMap;
}





// Working:
function getTeamAverage(team) {
    let dataArrTest = [[], []];
    let teamData = getTeamNumData(team);
    let matchNumberIndex = 0;
    console.log(teamData);
    for (let j = 0; j < teamData.length; j++) {
        for (let i = 0; i < teamData[0].length; i++) {
            if (teamData[0][i] == "Match Number") {
                teamData[j].splice(i, 1);
             }
        }
    }
    for (let i = 0; i < teamData[0].length; i++) {
            dataArrTest[0].push(teamData[0][i]);
    }
    for (let i = 0; i < teamData[1].length; i++) {
            dataArrTest[1].push(teamData[1][i]);
    }
    
    for (let i = 0; i < dataArrTest[1].length; i++) {
        if (dataArrTest[1][i] == false) {
            dataArrTest[1][i] = 0;
        }
        else if (dataArrTest[1][i] == true) {
            dataArrTest[1][i] = 1;
        }
    }
    console.log(numTeamMap);
    for (let i = 2; i < teamData.length; i++) {
        for (let j = 0; j < teamData[0].length; j++) {
            if (teamData[i][j] == false) {
                teamData[i][j] = 0;
            }
            else if (teamData[i][j] == true) {
                teamData[i][j] = 1;
            }
            dataArrTest[1][j] = parseFloat(teamData[i][j]) + parseFloat(dataArrTest[1][j]);
        }
    }
    for (let i = 0; i < dataArrTest[1].length; i++) {
        dataArrTest[1][i] /= teamData.length - 1;
    }
    console.log(dataArrTest);
    return dataArrTest;
}

function getTeamAverageMap() {
    let averageMap = new Map();
    let teams = [];
    console.log(numTeamMap);
    numTeamMap.forEach((value, key) => {
        teams.push(key);
    });
    for (let i = 0; i < teams.length; i++) {
        console.log(getTeamAverage(teams[i]));
        averageMap.set(teams[i], getTeamAverage(teams[i]));
    }
    console.log(averageMap);
    return averageMap;
}

export {
    getTeamData,
    getTeamNumData,
    getTeamCommentData,
    getTeamAverage,
    getIndividualDatapoints,
    convertToTableForm,
    convertCommentsToTableForm,
    convertNumDataToTableForm,
    convertAllToTableForm,
    resortColumn,
    resortColumnByPoint,
    convertToTeamMap,
};  