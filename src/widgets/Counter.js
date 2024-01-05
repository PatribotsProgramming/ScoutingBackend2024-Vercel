import React from "react";

class Counter extends React.Component{

    value = this.props.value;
    id = this.props.id;
    title = this.props.title;
    classNameDecorator = this.props.decorator;
    increment = this.props.increment !== undefined ? this.props.increment : 1;
    maxValue = this.props.maxValue !== undefined ? this.props.maxValue : 100;
    minValue = this.props.minValue !== undefined ? this.props.minValue : -100;
    resetToValue = this.props.resetToValue !== undefined ? this.props.resetToValue : 0;

    render(){

        return (
                <div className={"widget counter-container " + (this.decorator ? this.decorator : "")}>

                    <div className="subtitle">
                        {this.title}
                    </div>

                    <div className="counter-value" id={this.props.id} onDoubleClick={() => this.props.changeHandler(this.id, 100)}>
                        {this.props.value}
                    </div> 

                    <div className="btn-container">
                        
                        <button
                            className="btn dbtn"
                            onClick={() => this.props.changeHandler(this.id, -this.increment, this.minValue)}>
                            -
                        </button>

                        <button
                            className={"btn ubtn"}
                            onClick={() => this.props.changeHandler(this.id, this.increment, this.maxValue)}
                            src={plus}>
                            +
                        </button>
                    </div>

                    
                    
                </div>
        )
    }
}

export default Counter;