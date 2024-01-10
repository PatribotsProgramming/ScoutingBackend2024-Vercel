// export const data = [
//     //get snapshot and sell children
//     //get node modules
//     //sort by catagories (PointData vs CommentData)
//   ];

const points = 27;



// Jacob did this what it do?: 


// const getData = () => {
//   return getData(ref(db, '/')).then((snapshot) => {
//     if (snapshot.exists()) {
//       return snapshot.val();
//     }
//   }).catch((error) => {
//     console.error(error);
//   }).then((data) => {
//     return data;
//   })
// }

const data = `[
  {
      "r1": {
          "Team": "4738",
          "Additional Notes": "hi",
          "Alliance Color": "Red",
          "Chargepad Failure": false,
          "Cone Lower Auto": 0,
          "Cone Lower Teleop": 0,
          "Cone Middle Auto": 0,
          "Cone Middle Teleop": 0,
          "Cone Upper Auto": 0,
          "Cone Upper Teleop": 0,
          "Critical Failure": false,
          "Crossed Auto Line": false,
          "Cube Lower Auto": 0,
          "Cube Lower Teleop": 0,
          "Cube Middle Auto": 0,
          "Cube Middle Teleop": 0,
          "Cube Upper Auto": 0,
          "Cube Upper Teleop": 0,
          "Docked Auto": false,
          "Docked Teleop": false,
          "Engaged Auto": false,
          "Engaged Teleop": false,
          "Fumbles": 0,
          "Name": "Adam",
          "Supercharged Pieces": 0,
          "What they did well": "",
          "What they need to improve": ""
      },
      "b1": {
        "Team": "1538",
        "Additional Notes": "hi",
        "Alliance Color": "Red",
        "Chargepad Failure": false,
        "Cone Lower Auto": 0,
        "Cone Lower Teleop": 0,
        "Cone Middle Auto": 0,
        "Cone Middle Teleop": 0,
        "Cone Upper Auto": 0,
        "Cone Upper Teleop": 0,
        "Critical Failure": false,
        "Crossed Auto Line": false,
        "Cube Lower Auto": 0,
        "Cube Lower Teleop": 0,
        "Cube Middle Auto": 0,
        "Cube Middle Teleop": 0,
        "Cube Upper Auto": 0,
        "Cube Upper Teleop": 0,
        "Docked Auto": false,
        "Docked Teleop": false,
        "Engaged Auto": false,
        "Engaged Teleop": false,
        "Fumbles": 0,
        "Name": "Adam",
        "Supercharged Pieces": 0,
        "What they did well": "",
        "What they need to improve": ""
    }
  },
  {
      "r1": {
          "Team" : "1538",
          "Additional Notes": "",
          "Alliance Color": "Red",
          "Chargepad Failure": false,
          "Cone Lower Auto": 0,
          "Cone Lower Teleop": 0,
          "Cone Middle Auto": 0,
          "Cone Middle Teleop": 0,
          "Cone Upper Auto": 0,
          "Cone Upper Teleop": 0,
          "Critical Failure": false,
          "Crossed Auto Line": false,
          "Cube Lower Auto": 0,
          "Cube Lower Teleop": 0,
          "Cube Middle Auto": 0,
          "Cube Middle Teleop": 0,
          "Cube Upper Auto": 0,
          "Cube Upper Teleop": 0,
          "Docked Auto": false,
          "Docked Teleop": false,
          "Engaged Auto": true,
          "Engaged Teleop": false,
          "Fumbles": 0,
          "Name": "Adam",
          "Supercharged Pieces": 0,
          "What they did well": "",
          "What they need to improve": ""
      }
  }
]`;
export const getTeamData = (team) => {
  return bigTeamMap.get(team);
}
export const rawData = JSON.parse(data);
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
  let datapoints = [];
  // bots in first match (designated by r1, r2, r3, b1, b2, b3)
  let keys2 = Object.keys(data[0]);
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
  // overall map structure
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
  let points = getIndividualDatapoints(rawData);
  for (let i = 1; i < points.length; i++) {
    dataMap.set(points[i], 0);
  }
  for (let i = 1; i < teamData.length; i++) {
    for (let j = 1; j < teamData[i].length; j++) {
      if (isNumeric(points[i])) {
        dataMap.set(points[j], dataMap.get(points[j]) + teamData[i][j]);
      }
    }
  }

  for (let i = 0; i < points.length - 1; i++) {
    if (isNumeric(points[i])) {
      dataMap.set(points[i], dataMap.get(points[i]) / (teamData.length - 1));
    }
  }

  console.log(dataMap);
  return dataMap;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n) || n == true || n == false;
}