import { Treemap } from "recharts";
import "./TreeMap.css";

const TreeMap = (props) => {
    return(
        <div>
            <Treemap className="treemap"
                width={400}
                height={400}
                data={props.data}
                dataKey={props.dataKey}
                ratio={4/3}
                stroke="#fff"
                fill={props.fill}
            />
        </div>
    )
}

export default TreeMap;