import { getTeamData } from "../Data";
import React, { useEffect, useState } from "react";

import "./Tables.css";

function Contact() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            // Replace this with your actual data structure
            const result = [
                { name: "4738", ranking: 50, ampRanking: 20, amt: 2400, A: 120, B: 110 },
                { name: "4739", ranking: 60, ampRanking: 30, amt: 2500, A: 130, B: 120 },
                { name: "4740", ranking: 70, ampRanking: 40, amt: 2600, A: 140, B: 130 },
                { name: "4741", ranking: 80, ampRanking: 50, amt: 2700, A: 150, B: 140 },
                { name: "4742", ranking: 90, ampRanking: 60, amt: "HI", A: 160, B: 150 },
            ];
            setData(result);
        };

        fetchData();
    }, []);

    if (data.length === 0) {
        return <div>Loading...</div>;
    }

    const headers = Object.keys(data[0]);

// Filename - component/contact.js
// import { Chart } from "react-google-charts";
// import React from "react";
// import { options } from "../widgets/BarChart.js";
// import { useEffect, useState } from "react";
// const {fetchDataAndProcess} = require("../Data.js");
// function Contact() {
//     const [data, setData] = useState();
//     // if want specific team:
//     // data = {data && data.teamAverageMap.get("3128")}
//     // works same way for any other get methods, not needed for non get methods
//     useEffect(() => {
//         setTimeout(() => {
//             fetchDataAndProcess().then((data) => {
//                 setData(data);
//             });
//         }, 1000);
//     }, []);
//     console.log(data);
// 	return (
// 		<Chart
//             chartType="Table"
//             data = {data && data.teamAverageMap.get("4738")}
//             options={options}
//             width={"100%"}
//             height={"400px"}
//         />
// 	);

    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {headers.map((header, index) => (
                                <td key={index}>{item[header]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Contact;