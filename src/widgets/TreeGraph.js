import {
    Treemap
} from "recharts";

const TreeGraph = (props) => {
    return (
        <div>
            <Treemap
                width={window.innerWidth- 15}
                height={320}
                data={props.data}
                dataKey={props.dataKey}
                isAnimationActive={false}
                aspectRatio={4 / 3}
                stroke="#d4af37"
                fill="#282828"
            />
        </div>
    );
};

export default TreeGraph;