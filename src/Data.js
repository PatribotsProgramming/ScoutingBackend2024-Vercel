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
