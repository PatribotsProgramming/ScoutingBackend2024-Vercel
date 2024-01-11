import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { getAllData } from './JsonData'; 

const Charts = () => {
  const [data, setData] = useState([
    ["Team", "Number"], 
  ]);

  //test code not working need Frank's backend's code to test better
  useEffect(() => {
    getAllData().then(jsonString => {
      const jsonData = JSON.parse(jsonString);
      const chartData = Object.entries(jsonData).map(([key, value]) => [key, value]);
      setData(prevData => [...prevData, ...chartData]);
    });
  }, []);

  const options = {
    title: "Team Numbers",
  };

  return (
    <Chart
      chartType="BarChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}

export default Charts;