import { Chart } from "react-google-charts";
import { db } from "../Config";
import { ref, child, get, onChildAdded, onValue, set, Database, getDatabase, DataSnapshot, push } from 'firebase/database'

export const data = [
  ["Points", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];
export const options = {
  title: "My Daily Activities",
};

function getData() {
    const dbRef = db.ref(db, "/Team");
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

const charts = () => {
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  )
}
export default charts