// Working
const autoWeights = 
{
    "Leave in Auto" : 1,
    "Amp Auto" : 3,
    "Speaker Auto" : 3,
}
const teleopWeights = 
{
    "Speaker Teleop" : .5,
    "Amp Teleop" : 1,
    "Amped Speaker" : 1,
    "Fumbles" : 0,
    "Coopertition" : 0,
    "Average Cycle Time" : 0,
    "Driving" : 0,
    "Human Player" : 0,
}
const endGameWeights = 
{
    "End Park" : .5,
    "End Onstage" : 2,
    "Climb Failure" : (-2),
    "Critical Failure"  : 0,
    "Temp Failure" : 0,
    "Trap" : 2
}

const scoreWeights = {
    ...autoWeights,
    ...teleopWeights,
    ...endGameWeights,
  };
const ampWeights = 
  {
      "Amp Auto" : scoreWeights["Amp Auto"],
      "Amp Teleop" : scoreWeights["Amp Teleop"]
  }
const speakerWeights = 
  {
    "Speaker Auto" : scoreWeights["Speaker Auto"],
    "Speaker Teleop" : scoreWeights["Speaker Teleop"],
    "Amped Speaker" : scoreWeights["Amped Speaker"]
  }
// Working
function assignMatchScoreIndividual(match, dataPoints) {
    let score = 0;
    for (let i = 0; i < match.length; i++) {    
        if (scoreWeights[dataPoints[i]] === undefined) continue;
        score += parseFloat(match[i]) * scoreWeights[dataPoints[i]];
    }
    return score;
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
    console.log(newData);
    return newData;
}

function assignScore(match, dataPoints, weightMap) {
    let score = 0;
    for (let i = 0; i < match.length; i++) {
        if (weightMap[dataPoints[i]] === undefined) continue;
        score += parseFloat(match[i]) * weightMap[dataPoints[i]];
    }
    return score;
}

