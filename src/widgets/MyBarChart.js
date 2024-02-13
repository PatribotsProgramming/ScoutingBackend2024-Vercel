import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Rectangle,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

function MyBarChart({ width, height, data, margin, bar1Config, bar2Config, bar3Config, teamList }) {
    const CustomizedAxisTick = (props) => {
        const { x, y, payload } = props;
        let label = payload.value;
        console.log(label);
        if (label.length > 7) {
            // Change this value to adjust the maximum length
            label = label.slice(0, 10) + '...'; // Truncate and add ellipsis
        }

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    fill="#666"
                    transform="rotate(-35)"
                >
                    {label}
                </text>
            </g>
        );
    };

    return (
            <BarChart width={width} height={height} data={data} margin={margin}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="key" tick={<CustomizedAxisTick />} />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={25}/>
                <Bar
                    dataKey={teamList[0]}
                    fill={bar1Config.fill}
                    activeBar={bar1Config.activeBar}
                />
                <Bar
                    dataKey={teamList[1]}
                    fill={bar2Config.fill}
                    activeBar={bar2Config.activeBar}
                />
                <Bar
                    dataKey={teamList[2]}
                    fill={bar3Config.fill}
                    activeBar={bar3Config.activeBar}
                />
            </BarChart>
    );
}

export default MyBarChart;
