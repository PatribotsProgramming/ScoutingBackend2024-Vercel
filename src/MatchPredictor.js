

const realScores =  
{
    "Leave in Auto" : 2,
    "Amp Auto" : 5,
    "Speaker Auto" : 5,
    "Amp Teleop" : 3.4,
    "Amped Speaker" : 3.4,
    "Speaker Teleop" : 2, 
    "End Park" : 2,
    "End Onstage" : 3,
    "Trap" : 5
}


export function predictTeamScore(teamArr) {
    let score = 0;
    for (let i = 0; i < teamArr.length; i++) {
        score += getTeamScore(teamArr[i]);
    }
    return score;
}  

function getTeamScore(data) {
    let score = 0;
    for (let i = 0; i < data[0].length; i++) {
        if (realScores[data[0][i]] != undefined) {
            score += realScores[data[0][i]] * data[1][i];
        }
    }
    return score;
}




