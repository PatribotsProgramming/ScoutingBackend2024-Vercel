const weights = 
{
    "Team" : 0,
    "Match Number" : 0,
    "Leave in Auto" : 1,
    "Amp Auto" : 3,
    "Speaker Auto" : 3,
    "Speaker Teleop" : .5,
    "Amp Teleop" : 1,
    "Amped Speaker" : 1,
    "Fumbles" : 0,
    "Coopertition" : 0,
    "Average Cycle Time" : 0,
    "Driving" : 0,
    "Human Player" : 0,
    "End Park" : .5,
    "End Onstage" : 2,
    "Climb Failure" : (-2),
    "Critical Failure"  : 0,
    "Temp Failure" : 0,
    "Trap" : 2
}

export function assignMatchScoreIndividual(match, dataPoints) {
    let score = 0;
    for (let i = 0; i < match.length; i++) {
        
        score += parseFloat(match[i]) * weights[dataPoints[i]];
    }
    return score;
} 

export function assignMatchScoreToEach(data) {
    let newData = [...data];
    for (let i = 1; i < newData.length; i++) {
        newData[i].push(assignMatchScoreIndividual(newData[i], newData[0]));
    }
    newData[0].push("Score");
    return newData;
}
