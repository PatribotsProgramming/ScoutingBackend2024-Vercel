import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter,
} from "recharts";

// Function to calculate the line of best fit
const calculateBestFit = (data, key) => {
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    let count = 0;

    for (let i = 0; i < data.length; i++) {
        let x = data[i].index;
        let y = data[i][key];
        sumX += x;
        sumY += y;
        sumXX += x*x;
        sumXY += x*y;
        count++;
    }

    let m = (count*sumXY - sumX*sumY) / (count*sumXX - sumX*sumX);
    let b = (sumY/count) - (m*sumX)/count;

    return data.map((item) => {
        return { ...item, [`${key}Line`]: m * item.index + b };
    });
};

const ScatterGraph = ({
    data = [
            { index: 10000, red: 1643, blue: 790 },
            { index: 1666, red: 182, blue: 42 },
            { index: 625, red: 56, blue: 11 },
    ],
    xAxisKey = "index",
    yAxisUnit = "ms",
    scatter1 = { name: "red", dataKey: "red", fill: "red" },
    scatter2 = { name: "blue", dataKey: "blue", fill: "blue" },
}) => {
    let dataWithBestFit = calculateBestFit(data, scatter1.dataKey);
    dataWithBestFit = calculateBestFit(dataWithBestFit, scatter2.dataKey);

    return (
        <ComposedChart
            width={500}
            height={400}
            data={dataWithBestFit}
            margin={{
                top: 20,
                right: 80,
                bottom: 20,
                left: 20,
            }}
        >
            <CartesianGrid stroke="#f5f5f5" />
            <Tooltip />
            <Legend />

            <XAxis
                dataKey={xAxisKey}
                type="number"
                label={{
                    value: "Index",
                    position: "insideBottomRight",
                    offset: 0,
                }}
            />
            <YAxis
                unit={yAxisUnit}
                type="number"
                domain={[0, 'dataMax']}
                label={{ value: "Time", angle: -90, position: "insideLeft" }}
            />
            <Scatter name={scatter1.name} dataKey={scatter1.dataKey} fill={scatter1.fill} />
            <Scatter name={scatter2.name} dataKey={scatter2.dataKey} fill={scatter2.fill} />
            <Line
                dataKey={`${scatter1.dataKey}Line`}
                stroke={scatter1.fill}
                dot={false}
                activeDot={false}
                legendType="none"
            />
            <Line
                dataKey={`${scatter2.dataKey}Line`}
                stroke={scatter2.fill}
                dot={false}
                activeDot={false}
                legendType="none"
            />
        </ComposedChart>
    );
};

export default ScatterGraph;