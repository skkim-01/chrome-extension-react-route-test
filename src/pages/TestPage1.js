import React from "react";
import { TextField } from "@material-ui/core";
import QRCode from "react-qr-code";
import BaseComponent from "./_baseComponent";

export default class TestPage1 extends BaseComponent {
    constructor(props) {        
        super(props);
        this.state = {
            text: 'render page 1',
        };

        if (props.text) {
            this.state.text = props.text
        }
        
        this.keyPress = this.keyPress.bind(this)
        this.onClickHome = this.onClickHome.bind(this)
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
        super.route('/')
    }

    keyPress(event) {        
        if ( event.keyCode == 13 ) {            
            if( this.state.text == event.target.value ) return
            super.setState({
                text: event.target.value
            })
        }
    }
}