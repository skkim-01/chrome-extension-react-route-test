import React from "react";
import RouteHandler from "../handle/router/routes"

function onClickTestPage1() {
  RouteHandler.move(null, '/page1', null)
}

function onClickTestPage2() {
  RouteHandler.move(null, '/page2', null)
}

export default function Home() {
    return (
        <div className="App">
          <p>
            <button onClick={onClickTestPage1}> Page1 </button>
          </p>
          <p>
            <button onClick={onClickTestPage2}> Page2 </button>
          </p>
        </div>
    );
};
