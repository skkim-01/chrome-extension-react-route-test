import React from "react";
import RouteHandler from "../handle/router/routes"

function onClickTestPage1() {
  RouteHandler.move(null, '/page1', null)
}

function onClickTestPage2() {
  RouteHandler.move(null, '/page2', null)
}

function onClickTestPage3() {
  RouteHandler.move(null, '/NotFoundTest', null)
}

export default function Home() {
    return (
        <div className="App">
          <button onClick={onClickTestPage1}> Page1 </button>
          <button onClick={onClickTestPage2}> Page2 </button>
          <button onClick={onClickTestPage3}> NotFoundTest </button>
        </div>
    );
};
