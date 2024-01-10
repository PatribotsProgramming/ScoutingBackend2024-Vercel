import { Chart } from "react-google-charts";
import { db } from "../Config";
import { ref, child, get, onChildAdded, onValue, set, Database, getDatabase, DataSnapshot, push } from 'firebase/database'

export const data = [
  ["Task", "Hours per Day"],
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
    fetch('https://scouting-website-ee380-default-rtdb.firebaseio.com/')
    .then(response => response.json())
    .then(data => this.setState({ items: data }));
}

const charts = () => {
  return (
    <Chart
      chartType="BarChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  )
}
export default charts