// Filename - component/contact.js
import { Chart } from "react-google-charts";
import React from "react";
import { options } from "../widgets/BarChart.js";
import { useEffect, useState } from "react";
const {fetchDataAndProcess} = require("../Data.js");
function Contact() {
    const [data, setData] = useState();
    // if want specific team:
    // data = {data && data.teamAverageMap.get("3128")}
    // works same way for any other get methods, not needed for non get methods
    useEffect(() => {
        setTimeout(() => {
            fetchDataAndProcess().then((data) => {
                setData(data);
            });
        }, 1000);
    }, []);
    console.log(data);
	return (
		<Chart
            chartType="Table"
            data = {data && data.teamAverageMap.get("4738")}
            options={options}
            width={"100%"}
            height={"400px"}
        />
	);

}

export default Contact;
