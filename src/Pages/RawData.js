// Filename - component/contact.js
import { Chart } from "react-google-charts";
import { allData } from "../Data";
import React from "react";
import { options } from "../widgets/BarChart.js";
import { getTeamData } from "../Data";
console.log(allData);
console.log(allData)
function Contact() {
	return (
		<Chart
      chartType="Table"
      data={getTeamData("4567")}
      options={options}
      width={"100%"}
      height={"400px"}
    />
	
	);

}

export default Contact;
