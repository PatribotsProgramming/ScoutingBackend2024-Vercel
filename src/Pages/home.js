// Filename - component/home.js
import "./Home.css";
import React from "react";
import TreeMap from "../widgets/TreeMap";
import RadarGraph from "../widgets/RadarGraph";
import LineGraph from "../widgets/LineGraph" ;
const data = [
    { name: "4738", ranking: 50, ampRanking: 20 , amt: 2400, A: 120, B: 110 },
    { name: "4739", ranking: 60, ampRanking: 30 , amt: 2500, A: 130, B: 120 },
    { name: "4740", ranking: 70, ampRanking: 40 , amt: 2600, A: 140, B: 130 },
    { name: "4741", ranking: 80, ampRanking: 50 , amt: 2700, A: 150, B: 140 },
    { name: "4742", ranking: 90, ampRanking: 60 , amt: "HI", A: 160, B: 150 },
];

//tree
//radial
//scater with cells


function Home() {
    return (
        <div className="charts">
            
            <LineGraph 
                data={data} 
                dataKeyLine="ampRanking" 
                dataKeyX="name" 
                strokeColor="#D88484" 
                margin={{ top: 5, right: 20, bottom: 5, left: 100 }}
            />
            <RadarGraph 
                data={data} 
                angleKey="amt" 
                radiusDomain={[0, 200]} 
                radar1={{ name: "4738", dataKey: "ranking", stroke: "#8884d8", fill: "#8884d8", fillOpacity: 0.6 }} 
                radar2={{ name: "4739", dataKey: "ranking", stroke: "#82ca9d", fill: "#82ca9d", fillOpacity: 0.6 }}
            />

            <TreeMap data={data} dataKey="uv" fill="#8884d8" />
        </div>
    );
}

export default Home;
