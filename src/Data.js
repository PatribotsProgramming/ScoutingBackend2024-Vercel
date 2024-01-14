

import {data} from './SampleData.js';
import {Chart} from 'react-google-charts';
import { getAllData } from './widgets/JsonData.js';
//const data = getAllData();


const eventCode = '2024Testing';

export const getTeamData = (team) => {
  return bigTeamMap.get(team);
}
export const getTeamNumData = (team) => {
  return numTeamMap.get(team);
}
export const getTeamCommentData = (team) => {
  return commentTeamMap.get(team);
}

export const rawData = JSON.parse(data)['scouting'][eventCode];
console.log(rawData);
console.log(convertNumDataToTableForm(rawData));
export const allData = resortColumnByPoint(convertAllToTableForm(rawData), 'Team', 0);
export const commentData = resortColumnByPoint(convertCommentsToTableForm(rawData), 'Team', 0);
export const numData = resortColumnByPoint(convertNumDataToTableForm(rawData), 'Team', 0);
console.log(allData);
// console.log(resortColumn(dataTest, 1, 2));

export const bigTeamMap = convertToTeamMap(allData);
export const commentTeamMap = convertToTeamMap(commentData);
export const numTeamMap = convertToTeamMap(numData);
console.log(bigTeamMap);
console.log(getTeamAverage("4567"));



console.log(allData);
function convertToTableForm(data, datatype) {
  // overall data structure
  let table = [];

  // rows of the table
  let row = getIndividualDatapoints(data);
  row[0].push("Team");
  row[1].push("Team");
  
  // pushes the first row to the table

  if (datatype == 'comments') {
    table.push(row[0]);
  }
  else {
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
      console.log(dataKeys);
      console.log(row);
      for (let k = 0; k < dataKeys.length; k++) {
        row.push(botData[dataKeys[k]]);
      }
      row.push(bots[j].substring(bots[j].length - 4, bots[j].length));
      table.push(row);
    }
    
  }
  console.log(table);
  
  return table;
}

function convertCommentsToTableForm(data) {
  return convertToTableForm(data, 'comments');
}
function convertNumDataToTableForm(data) {
  console.log(convertToTableForm(data, 'data'));
  return convertToTableForm(data, 'data');
}
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

function resortColumnByPoint(data, point, columnGoal) {
  console.log(data);
  for (let i = 0; i < data[0].length; i++) {
    if (data[0][i] == point) {
      return resortColumn(data, i, columnGoal);
    }
  }
}


function getIndividualDatapoints(data) {
  let datapoints = [[], []];

  let matchKeys = Object.keys(data);

  // if there are no matches, return empty table
  if (matchKeys.length == 0) {
    //return table;
  }
  // gets all the data points using the data from the first bot in the first match
  let commentPoints = Object.keys(data[matchKeys[0]][Object.keys(data[matchKeys[0]])[0]]['comments']);

  let partialDataPoints = Object.keys(data[matchKeys[0]][Object.keys(data[matchKeys[0]])[0]]['data']);

  // pushes those data points to the first row of the table (the header)
  for (let i = 0; i < commentPoints.length; i++) {
    datapoints[0].push(commentPoints[i]);
  }
  for (let i = 0; i < partialDataPoints.length; i++) {
    datapoints[1].push(partialDataPoints[i]);
  }
  console.log(datapoints);
  return datapoints;
}

function convertToTeamMap(data, datatype) {
  let teamMap = new Map();
  const points = getIndividualDatapoints(rawData);
  for (let i = 1; i < data.length; i++) {
    if (!teamMap.has(data[i][0])) {
      teamMap.set(data[i][0], [data[0], data[i]]);
    }
    else {
      teamMap.get(data[i][0]).push(data[i]);
    }
  }
  console.log(teamMap);
  return teamMap;
}




function getTeamAverage(team) {
  let dataMap = new Map();
  let teamData = getTeamNumData(team);
  console.log(teamData);
  
  console.log(dataMap);
  return dataMap;
}
