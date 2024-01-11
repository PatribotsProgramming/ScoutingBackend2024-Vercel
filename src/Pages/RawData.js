// Filename - component/contact.js
import { Chart } from "react-google-charts";
import { dataTest } from "../Data";
import { getTeamData } from "../Data";
import React from "react";
import { options } from "../widgets/BarChart.js";

function Contact() {
	return (
		<Chart
		chartType="Table"
		data={dataTest}
		// data = {dataTest}
		options={options}
		width={"100%"}
		height={"400px"}
	  />
	
	);

}

export default Contact;
