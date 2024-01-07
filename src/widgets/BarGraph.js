import React from "react";

import { Chart } from "react-google-charts";

class BarGraph extends React.Component{

    id = this.props.id;
    title = this.props.title;
    subtitle = this.props.subtitle;
    classNameDecorator = this.props.decorator;
    sortMetrics = this.props.sortMetrics;
    xLabel = this.props.xLabel;
    yLabel = this.props.yLabel;
    
    
    formatGraphData = (data) => {
        let formattedData = [];
        this.graphData.forEach((item) => {
            formattedData.push([item[0], ...item[1]]);
        });
        return formattedData;
    }

    render(){
        return (

            <div className={"widget bar-graph-container " + (this.decorator ? this.decorator : "")}>
                {//A map function that goes through the sortMetrics and creates a dropdown for each one
                // This goes through and finds the point level where the data is actually stored
                // Then it formats the graph data by the x and y labels (which must be the same as the ones in the database)
                // Then it passes the formatted data into the graph
                // Make sure to try to use the builtin parameters for the title and subtitle of the graph
                    // But if you can't, then you can just use the title and subtitle props and make new divs
                
                }
            </div>
        )
    }
}

export default BarGraph;