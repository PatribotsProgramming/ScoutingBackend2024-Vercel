// Working
const autoWeights = 
{
    "Leave in Auto" : 1,
    "Amp Auto" : 2.55,
    "Speaker Auto" : 2.55,
    "Center Intakes Auto" : 3.67

}
const endGameWeights = 
{
    "End Onstage" : 3,
}

const teleopPieceWeights = {
    "Speaker Full Cycles" : 1,
    "Speaker Center Cycles" : 0.5,
    "Speaker Wing Cycles" : 0.333,
    "Amp Full Cycles" : 1,
    "Amp Center Cycles" : 0.5,
    "Amp Wing Cycles" : 0.333,
}

const autoPieceWeights = {
    "Speaker Auto" : 1,
    "Amp Auto" : 1
}

const teleopWeights = {
    ...multiplyByPieceWeights(teleopPieceWeights),
    "Pass Full Cycles" : 1.71,
    "Pass Center Cycles" : 0.855,
    "Pass Wing Cycles" : 0.57,
    "Fumbles Amp Full Cycles" : 1.71,
    "Fumbles Speaker Full Cycles" : 1.468,
    "Trap" : 5
};



const scoreWeights = {
    ...autoWeights,
    ...teleopWeights,
    ...endGameWeights,
  };
const ampWeights = 
  {
    "Amp Full Cycles" : 1,
    "Amp Center Cycles" : 0.5,
    "Amp Wing Cycles" : 0.333,
  }

const speakerWeights = 
  {
    "Speaker Full Cycles" : 1,
    "Speaker Center Cycles" : 0.5,
    "Speaker Wing Cycles" : 0.333,
  }
const passWeights = 
  {
    "Pass Full Cycles" : 1,
    "Pass Center Cycles" : .5,
    "Pass Wing Cycles" : .333,
    "Fumbles Amp Full Cycles" : 0.466,
    "Fumbles Speaker Full Cycles" : 0.4
  }
const fumbleSpeakerWeights = {
    "Fumbles Speaker Center Cycles" : 1,
    "Fumbles Speaker Wing Cycles" : 1,
    "Fumbles Speaker Full Cycles" : 1
}
const fumbleAmpWeights = {
    "Fumbles Amp Center Cycles" : 1,
    "Fumbles Amp Full Cycles" : 1,
    "Fumbles Amp Wing Cycles" : 1,
}


const fumbleWeights = 
{
    ...fumbleSpeakerWeights,
    ...fumbleAmpWeights
}





export function assignMatchScoreToEach(data, dataType) {
    let weightMap = scoreWeights;
    let newData = [...data];
    switch (dataType) {
        case "Auto" :
            weightMap = autoWeights;
            break;
        case "Tele Pieces" :
            weightMap = teleopPieceWeights
            break;
        case "Teleop" :
            weightMap = teleopWeights
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
        case "Passes" :
            weightMap = passWeights;
            break;
        case "Fumbles" :
            weightMap = fumbleWeights;
            break;
        case "Fumbles Speaker" :
            weightMap = fumbleSpeakerWeights;
            break;
        case "Fumbles Amp" :
            weightMap = fumbleAmpWeights;
            break;
        case "Auto Pieces" :
            weightMap = autoPieceWeights;
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
    return assignScores(data, ["Score", "Auto", "Auto Pieces", "Teleop", "Endgame", "Amp", "Speaker", "Passes", "Tele Pieces", "Fumbles", "Fumbles Amp", "Fumbles Speaker"]);
}

function assignScore(match, dataPoints, weightMap) {
    let score = 0;
    for (let i = 0; i < match.length; i++) {
        if (weightMap[dataPoints[i]] === undefined) continue;
        score += parseFloat(match[i]) * weightMap[dataPoints[i]];
    }
    return score.toFixed(2);
}

function multiplyByPieceWeights(obj) {
    let newObj = {...obj};
    for (let key in obj) {

        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key] * 3.67;
          }
        }
    console.log(newObj);
    return newObj;
}

