import RouteHandler from "../handle/router/routes";

export default class BaseComponent {
    constructor(props) {
        this.state = {
            ...props
        }
    }

    // abstract interface
    render() {}

    route(routeName, nextArgs={}, currentArgs={}) {        
        RouteHandler.move(currentArgs, routeName, nextArgs)
    }

    setState(nextState={}) {
        this.state = {
            ...this.state,
            ...nextState
        }
        RouteHandler.update(nextState)
    }
}


// when use async render....
export class AsyncComponent {
    asyncFunctionExecuted = false
    constructor(props) {
        this.state = {
            ...props
        }

        this.executeAsyncRunner = this.executeAsyncRunner.bind(this)
        this.render = this.render.bind(this)
        this.setState = this.setState.bind(this)
    }

    route(routeName, nextArgs={}, currentArgs={}) {
        this.asyncFunctionExecuted = false
        RouteHandler.move(currentArgs, routeName, nextArgs)
    }

    async executeAsyncRunner(asyncRunnerFn) {
        await asyncRunnerFn()
        this.setState({}, true) 
    }
    
    render(asyncRunnerFn, resultFn, waitFn) {
        console.log("AsyncComponent::render():", this.asyncFunctionExecuted)
        if( !this.asyncFunctionExecuted ) {
            this.executeAsyncRunner(asyncRunnerFn)
        }
        return (
            (this.asyncFunctionExecuted) ? resultFn() : waitFn()
        )
    }

    setState(nextState={}, isAsyncFunction=false) {
        this.asyncFunctionExecuted = isAsyncFunction
        this.state = {
            ...this.state,
            ...nextState            
        }
        console.log("setState:", isAsyncFunction, this.asyncFunctionExecuted)
        RouteHandler.update(nextState)
    }
}