// Filename - component/home.js
import "./Home.css";
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    RadarChart,
    PolarGrid,
    Legend,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
} from "recharts";
import GridExample from "../widgets/GridComponent";

const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400, A: 120, B: 110 },
    { name: "Page B", uv: 300, pv: 4567, amt: 1234, A: 130, B: 120 },
    { name: "Page C", uv: 600, pv: 9876, amt: 3456, A: 150, B: 130 },
    { name: "Page D", uv: 800, pv: 5678, amt: 6789, A: 160, B: 140 },
    { name: "Page E", uv: 700, pv: 8765, amt: 4321, A: 170, B: 150 },
];

//tree
//radial
//scater with cells

const renderLineChart = (
    <div>
        <LineChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    </div>
);

const renderRadarChart = (
    <div>
        <RadarChart outerRadius={90} width={730} height={250} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis angle={30} domain={[0, 200]} />
            <Radar
                name="Mike"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
            />
            <Radar
                name="Lily"
                dataKey="B"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
            />
            <Legend />
        </RadarChart>
    </div>
);

function Home() {
    return (
        <div className="charts">
            <div className="line-chart">{renderLineChart}</div>
            <div className="radar-chart">{renderRadarChart}</div>
            <GridExample />
        </div>
    );
}

export default Home;
