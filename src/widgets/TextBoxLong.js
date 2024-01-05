import React from "react";


class TextBoxLong extends React.Component{

    title = this.props.title
    id = this.props.id
    classNameDecorator = this.props.decorator
    value = this.props.value

    render(){
        return (
            <div className={"widget textboxLong-container " + (this.decorator ? this.decorator : "")}>
                <div className="subtitle">
                    {this.title}
                </div>
            
                <textarea
                    id={this.id}
                    type="text"
                    className="textbox"
                    onChange={e => {
                        this.props.changeHandler(this.id, e.target.value)
                    }}
                    value={this.props.value}
                />

            </div>
        )
    }
}

export default TextBoxLong;