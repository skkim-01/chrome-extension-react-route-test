import React from "react";
import RouteHandler from "../handle/router/routes"
import randomWords from "random-words"

// test code: React.Component
export default class TestPage2 extends React.Component {
    constructor(props) {        
        super(props);
        this.state = {
            id: 0,
            name: '',
            description: '',
            raw: {}
        };

        if(props) {
            this.state = {
                ...this.state,
                ...props
            }
        }

        this.onClickCheckContext = this.onClickCheckContext.bind(this)
        this.onClickGenerateContext = this.onClickGenerateContext.bind(this)
        this.onClickClearCurrent = this.onClickClearCurrent.bind(this)
        this.onClickClearAll = this.onClickClearAll.bind(this)
    }

    onClickClearCurrent() {
        RouteHandler.clearCurrentContext()
    }

    onClickClearAll() {
        RouteHandler.clearAll()
    }

    
    onClickCheckContext() {
        window.alert(JSON.stringify(this.state))
    }

    onClickGenerateContext() {
        let context = { 
            id: Math.floor(Math.random() * 65535),
            name: randomWords(),
            description: randomWords(10),
            raw: {
                subkey: 'subvalue',
                subMap: {
                    'k': 'v'
                },
                subArray: [
                    1, '2', {'k': 3}, [4, '5']
                ],
                result: true                
            }
        }
        RouteHandler.update(context)
    }

    render() {
        return (
            <div>
                <button onClick={this.onClickHome}> Home </button> 
                <p>Current Page: {'/page2'}</p>
                <p>
                    <button onClick={this.onClickCheckContext}> check context </button>
                </p>
                <p>
                    <button onClick={this.onClickGenerateContext}> generate context </button>
                </p>
                <p>
                    <button onClick={this.onClickClearCurrent}> clear current context </button>
                </p>
                <p>
                    <button onClick={this.onClickClearAll}> clear all context </button>
                </p>
            </div>
        );
    }

    onClickHome() {
        RouteHandler.move(null, '/', null)
    }
}