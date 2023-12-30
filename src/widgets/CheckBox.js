import React from "react";


class CheckBox extends React.Component{
        
    value = this.props.value    
    id = this.props.id
    title = this.props.title
    decorator = this.props.decorator

    render(){
        return (
            <div className={"widget checkbox-container " + (this.decorator ? this.decorator : "")}>
                <div className="subtitle">
                    {this.title}
                </div>
            
                <input
                    id={this.id}
                    type="checkbox"
                    className="checkbox"
                    value={this.value}
                    onChange={() => this.props.changeHandler(this.id)}
                />
                
            </div>
        )
    }
}

export default CheckBox;