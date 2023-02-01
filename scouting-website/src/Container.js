import logo from './logo.svg';
// import './App.css';

import CheckBox from './widgets/CheckBox';
import TextBox from './widgets/TextBox'
import Counter from './widgets/Counter'
import Submit from './widgets/Submit'
import Dropdown from './widgets/Dropdown';

import {v4 as uuidv4} from "uuid"
import React from 'react';

class Container extends React.Component{

  state = {
    items: [
      {
        id: uuidv4(),
        title: "Test text box",
        type: "text"
      },
      {
        id: uuidv4(),
        title: "Test checkbox 2",
        value: false,
        type: "checkbox"
      },
      {
        id: uuidv4(),
        title: "Test counter 4",
        value: 0,
        type: "counter"
      },
      {
        id: uuidv4(),
        title: "Test submit button",
        url: "https://google.com",
        type: "submit"
      },
      {
        id: uuidv4(),
        title: "test dropdown",
        data: ["option1", "option2", "option3"],
        type: "dropdown"
      },
    ]
  }

  increaseCounter = (id) => {
    this.setState({
        items: this.state.items.map(item => {
          if (item.id === id) {
            item.value = item.value + 1
          }
          return item
        })
    })
  }

  decreaseCounter = (id) => {
    this.setState({
        items: this.state.items.map(item => {
          if (item.id === id) {
            item.value = item.value - 1
          }
          return item
        })
    })
  }

  getIDFromTitle = (title) => {
    this.state.items.filter(item => {
      if (item.title === title){
        return item.id
      }
    })
  }

  handleCheckBoxChange = (id) => {
    this.setState({
      items: this.state.items.map(item => {
        if (item.id === id) {
          item.value = !item.value
          console.log(item.id + ", " +
                      item.value
                      )
        }
        return item
      })
    })
  }

  handleTextBoxChange = (id) =>{

  }

  render () {
    return (

      <ul className="App">

        {this.state.items.map(item => {
          if (item.type === "checkbox") {
            return (
              <CheckBox
                id={item.id}
                title={item.title}
                value={item.value}
                handleCheckBoxChange={this.handleCheckBoxChange}
              />
             ) 
          }
          else if (item.type === "text"){
            return (
              <TextBox
              id={item.id}
              title={item.title}
              />
            )
          }
          else if (item.type === "counter"){
            return (
              <Counter
              id={item.id}
              title={item.title}
              value={item.value}
              increaseCounter={this.increaseCounter}
              decreaseCounter={this.decreaseCounter}
              />
            )
          }
          else if (item.type === "submit"){
            return (
              <Submit
              id={item.id}
              title={item.title}
              url={item.url}
              />              
            )
          }
          else if (item.type === "dropdown"){
            return (
              <Dropdown
              id={item.id}
              title={item.title}
              data={item.data}
              />              
            )
          }
        })
        }

      </ul>
    );
  }
}

export default Container;
