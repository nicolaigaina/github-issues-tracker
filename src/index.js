import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";


class App extends Component{
    render(){
        return(
            <div>
                Hi!
            </div>
        )
    }
}

ReactDOM.render(<App />, document.querySelector(".container"));