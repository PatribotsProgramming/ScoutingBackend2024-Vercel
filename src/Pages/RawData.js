// Filename - component/contact.js
import { Chart } from "react-google-charts";
import React from "react";
import { options } from "../widgets/BarChart.js";
import { useEffect, useState } from "react";
const {fetchDataAndProcess} = require("../Data.js");
function Contact() {
    const [data, setData] = useState([]);
    // if want specific team:
    // data.length > 0 ? [] : data.numTeamMap.get("4738")
    useEffect(() => {
        setTimeout(() => {
            fetchDataAndProcess().then((data) => {
                setData(data);
            });
        }, 1000);
    }, []);
    console.log(data.allData);
	return (
		<Chart
            chartType="Table"
            data={data.allData}
            options={options}
            width={"100%"}
            height={"400px"}
        />
	);

}

export default Contact;
