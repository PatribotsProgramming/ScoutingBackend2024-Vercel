import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

const LineGraph = (props) => {
    return (
        <div className="line-chart">
            <LineChart width={600} height={300} data={props.data} margin={props.margin}>
                <Line
                    type="monotone"
                    dataKey={props.dataKeyLine}
                    stroke={props.strokeColor}
                />
                <XAxis dataKey={props.dataKeyX} />
                <YAxis />
                <Tooltip />
            </LineChart>
        </div>
    );
}

export default LineGraph;