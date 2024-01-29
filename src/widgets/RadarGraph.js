import {
    RadarChart,
    PolarGrid,
    Legend,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
} from "recharts";

const RadarGraph = (props) => {
    return (
        <div>
            <RadarChart outerRadius={90} width={730} height={250} data={props.data}>
                <PolarGrid />
                <PolarAngleAxis dataKey={props.angleKey} />
                <PolarRadiusAxis angle={30} domain={props.radiusDomain} />
                <Radar
                    name={props.radar1.name}
                    dataKey={props.radar1.dataKey}
                    stroke={props.radar1.stroke}
                    fill={props.radar1.fill}
                    fillOpacity={props.radar1.fillOpacity}
                />
            </RadarChart>
        </div>
    );
};

export default RadarGraph;