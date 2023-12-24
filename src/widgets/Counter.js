import React from "react";
import plus from "C:/Users/adame/Documents/Programming/Robotics/Simple-ASF/src/images/plus.png"
import minus from "C:/Users/adame/Documents/Programming/Robotics/Simple-ASF/src/images/minus.png"
import notFound from "C:/Users/adame/Documents/Programming/Robotics/Simple-ASF/src/images/notFound.png"


class Counter extends React.Component{

    value = this.props.value;
    id = this.props.id;
    title = this.props.title;
    classNameDecorator = this.props.decorator;
    increment = this.props.increment !== undefined ? this.props.increment : 1;
    maxValue = this.props.maxValue !== undefined ? this.props.maxValue : 100;
    minValue = this.props.minValue !== undefined ? this.props.minValue : -100;

    render(){

        return (
                <div className={"widget " + this.classNameDecorator}>

                    <div className="counterTitle">
                        {this.title}
                    </div>

                    <div className="value" id={this.props.id}>
                            {this.props.value}
                        </div> 
                    
                    <div className="btn-container">
                        
                        <button
                            className="btn dbtn"
                            onClick={() => this.props.changeHandler(this.id, -this.increment, this.minValue)}>
                            <img
                                src = {minus}
                                alt = {notFound}
                                className="btn-ico-down"
                            />
                        </button>
                        
                           

                        <button
                            className={"btn ubtn"}
                            onClick={() => this.props.changeHandler(this.id, this.increment, this.maxValue)}
                            src={plus}>
                            <img
                                src = {plus}
                                alt = {notFound}
                                className="btn-ico-up"
                                
                            />
                        </button>
                    </div>
                    
                </div>
        )
    }
}

export default Counter;