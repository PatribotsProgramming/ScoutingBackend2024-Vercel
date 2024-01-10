import { Chart } from "react-google-charts";
import { dataTest } from "../Data";
import { getTeamData } from "../Data";
export const options = {
  title: "My Daily Activities",
};

const charts = () => {
  return (
    <Chart
      chartType="Table"
      data={getTeamData("1538")}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  )
}
export default charts