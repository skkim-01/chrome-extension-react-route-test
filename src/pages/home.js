import React from "react";
import RouteHandle, { RouteConstants } from "../handle/router/routes"

async function onClickPage1() {
  RouteHandle.call(RouteConstants.page_page1)
}
  
function onClickPage2() {
  RouteHandle.call(RouteConstants.page_page2)
}

export default function Home() {
    return (
        <div className="App">
          <button onClick={onClickPage1}> Page1 </button>
          <button onClick={onClickPage2}> Page2 </button>
        </div>
    );
};
