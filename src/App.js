import React from "react";
import RouteHandler from "./handle/router/routes";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flag: true
    }
    this.updateCallback = this.updateCallback.bind(this)
  }

  updateCallback() {
    this.setState({ flag: !this.state.flag })
  }

  componentWillMount() {
    RouteHandler.init(this.updateCallback)
  }

  render() {
    return RouteHandler.fetch()
  }
}