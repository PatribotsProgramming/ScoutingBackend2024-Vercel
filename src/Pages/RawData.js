// Filename - component/contact.js
import { Chart } from "react-google-charts";
import React from "react";
import { options } from "../widgets/BarChart.js";
import { getTeamData } from "../Data";
function Contact() {
	return (
		<Chart
      chartType="Table"
      // data={getTeamData("4567")}
      options={options}
      width={"100%"}
      height={"400px"}
    />
	
	);

}

export default Contact;
