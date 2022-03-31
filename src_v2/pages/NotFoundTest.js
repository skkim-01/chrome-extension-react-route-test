import React from "react";
import RouteHandler from "../handle/router/routes"

function onClick() {
  RouteHandler.move(null, '/null/page', null)
}

// only for dev...
export default function NotFoundTest() {
    return (
        <div className="App">
          <button onClick={onClick}> NotFound: /null/page </button>
        </div>
    );
};
