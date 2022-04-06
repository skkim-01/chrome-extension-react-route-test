import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { AsyncComponent } from "./_baseComponent";


// test page
export default class TestPage2 extends AsyncComponent {
    customValue = 1

    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        this.onClicked = this.onClicked.bind(this)
        this.onClickedSkipAsync = this.onClickedSkipAsync.bind(this)
        this.onClickedHome = this.onClickedHome.bind(this)
        this.preRender = this.preRender.bind(this)
        this.render = this.render.bind(this)
        this.successRender = this.successRender.bind(this)
    }

    onClicked() {
        this.customValue = this.customValue + 1
        super.setState({ count: this.state.count + 1 })
    }

    onClickedSkipAsync() {
        this.customValue = this.customValue + 1
        super.setState({ count: this.state.count + 1 }, true)
    }

    onClickedHome() {
        super.route("/")
    }

    render() {        
        return super.render(this.preRender, this.successRender, this.waitRender)
    }

    async preRender() {
        await this.sleep(3000)
    }

    waitRender() {
        return (
            <div>
                <CircularProgress />
                <text>now loading... 3sec</text>
            </div>
        )        
    }

    successRender() {
        return (
            <div>
                <p>
                    <button onClick={this.onClickedHome}>
                        home
                    </button>
                </p>
                <p>                
                    State Count : {this.state.count}                    
                </p>
                <p>
                    custom Count : {this.customValue}
                </p>
                <p>
                <button onClick={this.onClicked}>
                    Render: retry async function
                </button>
                </p>
                <p>
                <button onClick={this.onClickedSkipAsync}>
                    Render: skip async function
                </button>
                </p>                
            </div>
        )
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
