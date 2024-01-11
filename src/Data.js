

import {data} from './SampleData.js';

// gets sampledata from SampleData.JSON

const eventCode = '2024Testing';
// export const getTeamData = (team) => {
//   return bigTeamMap.get(team);
// }
export const rawData = JSON.parse(data)['scouting'][eventCode];
console.log(rawData);
export const dataTest = convertAllToTableForm(rawData);
console.log(dataTest);
// export const bigTeamMap = convertToTeamMap(dataTest);
// export const teamData = getTeamAverage("1538");



console.log(dataTest);
function convertToTableForm(data, datatype) {
  // overall data structure
  let table = [];

  // rows of the table
  let row = getIndividualDatapoints(data);
  
  
  // pushes the first row to the table
  table.push(row[0]);
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
      for (let k = 0; k < dataKeys.length; k++) {
        row.push(botData[dataKeys[k]]);
      }
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
  return convertToTableForm(data, 'data');
}
function convertAllToTableForm(data) {
  let comments = convertCommentsToTableForm(data);
  let numData = convertNumDataToTableForm(data);
  for (let i = 1; i < comments.length; i++) {
    for (let j = 0; j < comments[i].length; j++) {
      numData[i].push(comments[i][j]);
    }
  }
  return numData;
  
}


function getIndividualDatapoints(data) {
  let datapoints = [[], []];

  let matchKeys = Object.keys(data);

  // if there are no matches, return empty table
  if (matchKeys.length == 0) {
    return table;
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

// function convertToTeamMap(data) {
//   let teamMap = new Map();
//   const points = getIndividualDatapoints(rawData);
//   for (let i = 1; i < data.length; i++) {
//     if (!teamMap.has(data[i][0])) {
//       teamMap.set(data[i][0], [data[0], data[i]]);
//     }
//     else {
//       teamMap.get(data[i][0]).push(data[i]);
//     }
//   }
//   console.log(teamMap);
//   return teamMap;
// }




// function getTeamAverage(team) {
//   let dataMap = new Map();
//   let teamData = getTeamData(team);
//   console.log(teamData);
//   let points = getIndividualDatapoints(rawData);
//   for (let i = 1; i < points.length; i++) { 
//     dataMap.set(points[i], 0);
//   }
//   for (let i = 1; i < teamData.length; i++) {
//     for (let j = 1; j < teamData[i].length; j++) {
//       dataMap.set(points[j], dataMap.get(points[j]) + teamData[i][j]);
//     }
//   }

//   for (let i = 1; i < points.length - 1; i++) {
//     dataMap.set(points[i], dataMap.get(points[i]) / (teamData.length - 1));
//   }
//   for (let i = 1; i < points.length - 1; i++) {
//     if (isNaN(dataMap.get(points[[i]]))) {
//       dataMap.delete(points[i]);
//     }
//   }
//   dataMap.set("Team", team);
//   console.log(dataMap);
//   return dataMap;
// }

