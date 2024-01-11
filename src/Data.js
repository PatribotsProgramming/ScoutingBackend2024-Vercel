import {data} from './SampleData.js';

// gets sampledata from SampleData.JSON

const eventCode = '2024Testing';
export const getTeamData = (team) => {
  return bigTeamMap.get(team);
}
export const rawData = JSON.parse(data)['scouting'][eventCode];
export const dataTest = convertToTableForm(rawData);
export const bigTeamMap = convertToTeamMap(dataTest);
export const teamData = getTeamAverage("1538");



console.log(dataTest);
function convertToTableForm(data) {
  // overall data structure
  let table = [];

  // rows of the table
  let row = getIndividualDatapoints(data);
  
  
  // pushes the first row to the table
  table.push(row);
  for (let i = 0; i < data.length; i++) {
    
    let newKeys = Object.keys(data[i]);
    for (let j = 0; j < newKeys.length; j++) {
      row = [];
      let newKeys2 = Object.keys(data[i][newKeys[j]]);
      // console.log(newKeys2);
      for (let k = 0; k < newKeys2.length; k++) {
        row.push(data[i][newKeys[j]][newKeys2[k]]);
      }
      table.push(row);
    }
    
  }
  console.log(table);
  
  return table;
}



function getIndividualDatapoints(data) {
  let datapoints = [[], []];
  console.log(data);
  let keys2 = Object.keys(data);
  console.log(keys);
  // if there are no matches, return empty table
  if (keys2.length == 0) {
    return table;
  }
  // gets all the data points using the data from the first bot in the first match
  let keys = Object.keys(data[0][keys2[0]]);
  // pushes those data points to the first row of the table (the header)
  for (let i = 0; i < keys.length; i++) {
    datapoints.push(keys[i]);
  }
  return datapoints;
}

function convertToTeamMap(data) {
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
  let teamData = getTeamData(team);
  console.log(teamData);
  let points = getIndividualDatapoints(rawData);
  for (let i = 1; i < points.length; i++) { 
    dataMap.set(points[i], 0);
  }
  for (let i = 1; i < teamData.length; i++) {
    for (let j = 1; j < teamData[i].length; j++) {
      dataMap.set(points[j], dataMap.get(points[j]) + teamData[i][j]);
    }
  }

  for (let i = 1; i < points.length - 1; i++) {
    dataMap.set(points[i], dataMap.get(points[i]) / (teamData.length - 1));
  }
  for (let i = 1; i < points.length - 1; i++) {
    if (isNaN(dataMap.get(points[[i]]))) {
      dataMap.delete(points[i]);
    }
  }
  dataMap.set("Team", team);
  console.log(dataMap);
  return dataMap;
}

