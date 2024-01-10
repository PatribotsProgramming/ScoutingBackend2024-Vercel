import { sortMetrics } from '../Config'
import { ref, child, get, onChildAdded, onValue, set, Database, getDatabase, DataSnapshot, push } from 'firebase/database'

const dbRef = db.ref(db, "/Team");

function getData() {
    return get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        }
    }).catch((error) => {
        console.log(error);
    })
    .then((data) => {
        return data;
    })
}



data.then((data) => 
console.log(data))


