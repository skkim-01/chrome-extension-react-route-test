import React from "react";
import RouteHandler from "../handle/router/routes"
import { TextField } from "@material-ui/core";
import QRCode from "react-qr-code";

// test code: React.Component
export default class TestPage1 extends React.Component {
    constructor(props) {        
        super(props);
        this.state = {
            text: 'render page 1',
        };

        if (props.text) {
            this.state.text = props.text
        }
        this.keyPress = this.keyPress.bind(this)
    }

    render() {
        return (
            <div>
                <button onClick={this.onClickHome}> Home </button> 
                <p>Current Page: {'/page1'}</p>                
                <TextField                                    
                    id="standard-basic"
                    label="standard"
                    variant="standard"
                    onKeyDown={this.keyPress}
                    fullWidth
                />
                <p>Inserted Text: {this.state.text}</p>                
                <QRCode value={this.state.text} />
            </div>
        );
    }

    onClickHome() {
        RouteHandler.move(null, '/', null)
    }

    keyPress(event) {        
        if ( event.keyCode == 13 ) {
            RouteHandler.update({text: event.target.value})            
        }
    }
}