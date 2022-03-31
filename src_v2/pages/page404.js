import React from "react";
import RouteHandler from "../handle/router/routes"

function onClickHome() {
    RouteHandler.move(null, '/', null)
}

export default function Page404() {
    return (
        <div className="App">
          <button onClick={onClickHome}> Home </button>
          <p>404 NOT FOUND</p>
        </div>
    );
};
