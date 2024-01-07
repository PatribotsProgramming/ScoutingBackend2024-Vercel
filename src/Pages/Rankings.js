// Filename - component/about.js

import React from "react";
import Chart from "react-google-charts";
import PieChart from "../widgets/PieChart";
import BarChart from "../widgets/BarChart";

function Rankings() {
	return (
        <div className="Rankings">
        <PieChart />
        <BarChart />
        </div>
    );
}
export default Rankings;    