import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { allData } from "../Data";
import { getTeamData } from "../Data";
export const options = {
  title: "My Daily Activities",
};

  return (
    <Chart
      chartType="Table"
      data={allData}
      // data = {dataTest}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}

export default Charts;