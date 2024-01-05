import React from "react";


class Dropdown extends React.Component{

    value = this.props.value;
    id = this.props.id;
    title = this.props.title;
    items = this.props.options.map((item) => {return {id: this.props.options.indexOf(item), title: item}});
    changeHandler = this.props.changeHandler;

    render(){
        return (
            <div className={"widget dropdown-container " + (this.decorator ? this.decorator : "")}>
                <div
                className="subtitle"
                >
                    {this.title}
                </div>
                
                <select
                    type="dropown"
                    className="dropdown"
                    onChange = {(e) => this.props.changeHandler(this.id, e.target.value)}
                    id = {this.id}
                    value = {this.props.value}
                    
                >
                    {this.items.map(item => {
                        try {
                            return (
                            <option 
                                key={item.id} 
                                value={item.title}
                            >
                                {item.title}
                            </option>
                            );
                        }
                        catch(err){
                            alert("Error: " + err);
                            console.log(err);
                            return null;
                        }
                    })}
                </select>

            </div>
            
        )
    }
}

export default Dropdown;