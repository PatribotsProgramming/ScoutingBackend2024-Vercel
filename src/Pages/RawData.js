// Filename - component/contact.js
import { Chart } from "react-google-charts";
import React from "react";
import { options } from "../widgets/BarChart.js";
import { useEffect, useState } from "react";
const {fetchDataAndProcess} = require("../Data.js");
function Contact() {
    const [data, setData] = useState(new Promise(() => {}));

    useEffect(() => {
        setData(fetchDataAndProcess());
    }
    , []);

    data.then((value) => {
        console.log(value.rawData);
    }
    );
    
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
