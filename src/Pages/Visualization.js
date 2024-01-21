// Filename - component/home.js
import "./Visualization.css";
import TreeMap from "../widgets/TreeMap";
import RadarGraph from "../widgets/RadarGraph";
import LineGraph from "../widgets/LineGraph";
import ScatterGraph from "../widgets/ScatterGraph";
import React, { useState } from "react";

const data = [
    { name: "4738", ranking: 50, ampRanking: 20, amt: 2400, A: 120, B: 110 },
    { name: "4739", ranking: 60, ampRanking: 30, amt: 2500, A: 130, B: 120 },
    { name: "4740", ranking: 70, ampRanking: 40, amt: 2600, A: 140, B: 130 },
    { name: "4741", ranking: 80, ampRanking: 50, amt: 2700, A: 150, B: 140 },
    { name: "4742", ranking: 90, ampRanking: 60, amt: "HI", A: 160, B: 150 },
];

function Visualization() {
    const [currentTab, setCurrentTab] = useState("LineGraph");

    return (
        <div className="container">
            <div className="tabs">
                <button
                    className="tab"
                    onClick={() => setCurrentTab("LineGraph")}
                >
                    Line Graph
                </button>
                <button
                    className="tab"
                    onClick={() => setCurrentTab("RadarGraph")}
                >
                    Radar Graph
                </button>
                <button
                    className="tab"
                    onClick={() => setCurrentTab("TreeMap")}
                >
                    Tree Map
                </button>
                <button
                    className="tab"
                    onClick={() => setCurrentTab("ScatterGraph")}
                >
                    Scatter Graph
                </button>
            </div>
            <div className="charts">
                {currentTab === "LineGraph" && (
                    <LineGraph
                        data={data}
                        dataKeyLine="ampRanking"
                        dataKeyX="name"
                        strokeColor="#D88484"
                        margin={{ top: 5, right: 20, bottom: 5, left: 100 }}
                    />
                )}
                {currentTab === "RadarGraph" && (
                    <RadarGraph
                        data={data}
                        angleKey="amt"
                        radiusDomain={[0, 200]}
                        radar1={{
                            name: "4738",
                            dataKey: "ranking",
                            stroke: "#8884d8",
                            fill: "#8884d8",
                            fillOpacity: 0.6,
                        }}
                        radar2={{
                            name: "4739",
                            dataKey: "ranking",
                            stroke: "#82ca9d",
                            fill: "#82ca9d",
                            fillOpacity: 0.6,
                        }}
                    />
                )}
                {currentTab === "TreeMap" && (
                    <TreeMap data={data} dataKey="uv" fill="#8884d8" />
                )}
                {currentTab === "ScatterGraph" && (
                    <ScatterGraph
                        data={data}
                        xAxisKey="name"
                        yAxisUnit="ms"
                        scatter1={{
                            name: "ranking",
                            dataKey: "ranking",
                            fill: "red",
                        }}
                        scatter2={{
                            name: "ampRanking",
                            dataKey: "ampRanking",
                            fill: "blue",
                        }}
                    />
                )}
            </div>
        </div>
    );
}

export default Visualization;
