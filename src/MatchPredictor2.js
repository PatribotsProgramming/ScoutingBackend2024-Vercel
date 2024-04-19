

const realScores =  
{
    "Leave in Auto" : 2,
    "Amp Auto" : 5,
    "Speaker Auto" : 5,
    "End Park" : 2,
    "End Onstage" : 3,
    "Trap" : 5
}


export function predictTeamScore2(teamArr) { 
    let amps = 0;
    let speakers = 0;
    for (let i = 0; i < teamArr.length; i++) {
        amps += getAmps(teamArr[i]);
        speakers += getSpeakers(teamArr[i]);
    }
    return getAutoEndgameScore(teamArr) + getTeleopScore(speakers, amps);
}  

function getAmps(data) {
    let amps = 0;
    for (let i = 0; i < data[0].length; i++) {
        if (data[0][i] == "Amp Teleop") {
            amps += data[1][i];
            break;
        }
    }
    return amps
}
// Working
function getTeleopScore(speakers, amps) {
    return speakers <= (amps/2) * 3 ? amps + speakers * 5 : ((amps/2) * 3) * 5 + (speakers - (amps/2) * 3) * 2 + amps;
}

function getSpeakers(data) {
    let speakers = 0;
    for (let i = 0; i < data[0].length; i++) {
        if (data[0][i] == "Speaker Teleop" || data[0][i] == "Amped Speaker") {
            speakers += data[1][i];
        }
    }
    return speakers
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
export function getAutoEndgameScore(teamArr) {
    let score = 0;
    for (let i = 0; i < teamArr.length; i++) {
        score += getTeamScore(teamArr[i]);
    }
    return score;
}  




