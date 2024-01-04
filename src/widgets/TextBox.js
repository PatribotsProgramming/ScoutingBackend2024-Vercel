import React from "react";


class TextBox extends React.Component{

    title = this.props.title
    id = this.props.id
    decorator = this.props.decorator
    value = this.props.value

    render(){
        return (
            <div className={"widget textbox-container " + (this.decorator ? this.decorator : "")}>
                <div className="subtitle">
                    {this.title}
                </div>
            
                <input
                    id={this.id}
                    type="text"
                    className="textbox"
                    onChange={e => {
                        this.props.changeHandler(this.id, e.target.value)
                    }}
                    value={this.value}
                />

            </div>
        )
    }
}

export default TextBox;