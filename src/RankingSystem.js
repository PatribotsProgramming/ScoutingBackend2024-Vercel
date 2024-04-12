// Working
let scores = new Map();
const autoWeights = 
{
    "Leave in Auto" : 1,
    "Amp Auto" : 1,
    "Speaker Auto" : 5,
}
const teleopWeights = 
{
    "Speaker Teleop" : 3.4,
    "Amp Teleop" : 3.4,
    "Amped Speaker" : 3.4,
    "Fumbles Amp" : 0,
    "Fumbles Speaker" : 0,
    "Co-Op" : 0,
    "Driving" : 0,
    "Human Player" : 0,
}
const endGameWeights = 
{
    "End Park" :1,
    "End Onstage" : 3,
    "Climb Failure" : (0),
    "Critical Failure"  : 0,
    "Temp Failure" : 0,
    "Trap" : 3.4
}

const scoreWeights = {
    ...autoWeights,
    ...teleopWeights,
    ...endGameWeights,
  };
const ampWeights = 
  {
      "Amp Auto" : 1,
      "Amp Teleop" : 1
  }
const speakerWeights = 
  {
    "Speaker Auto" : 1,
    "Speaker Teleop" : 1,
    "Amped Speaker" : 1
  }


export function assignMatchScoreToEach(data, dataType) {
    let weightMap = scoreWeights;
    let newData = [...data];
    switch (dataType) {
        case "Auto" :
            weightMap = autoWeights;
            break;
        case "Teleop" :
            weightMap = teleopWeights;
            break;
        case "Endgame" :
            weightMap = endGameWeights;
            break;
        case "Amp" :
            weightMap = ampWeights;
            break;
        case "Speaker" :
            weightMap = speakerWeights;
            break;
    }
    for (let i = 1; i < newData.length; i++) {
        newData[i].push(assignScore(newData[i], newData[0], weightMap));
    }
    newData[0].push(dataType);
    return newData;
}


export function assignScores(data, dataTypeArr) {
    let newData = [...data];
    for (let i = 0; i < dataTypeArr.length; i++) {
        newData = assignMatchScoreToEach(newData, dataTypeArr[i]);
    }
    return newData;
}

export function assignAllScores(data) {
    return assignScores(data, ["Score", "Auto", "Teleop", "Endgame", "Amp", "Speaker"]);
}
function assignScore(match, dataPoints, weightMap) {
    let score = 0;
    for (let i = 0; i < match.length; i++) {
        if (weightMap[dataPoints[i]] === undefined) continue;
        score += parseFloat(match[i]) * weightMap[dataPoints[i]];
    }
    return score;
}

