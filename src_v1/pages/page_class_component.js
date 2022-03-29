import React from "react";
import RouteHandle, { RouteConstants } from "../handle/router/routes"

// test code: React.Component
export default class ClassComponent extends React.Component {
    constructor(props) {        
        super(props);
        this.state = {
            text: 'React.Component.render test',
            clicked: 0
        };
    }

    render() {
        this.clicked = this.clicked + 1
        
        return (
            <div>
                <button onClick={this.onClickHome}> Home </button> 
                <p>Current Page: {RouteConstants.page_luk_test}</p>
                <p>Text: {this.state.text}</p>
                <p>clicked count: {this.state.clicked}</p>
            </div>
        );
    }

    onClickHome() {
        RouteHandle.call(RouteConstants.page_home)
    }
}