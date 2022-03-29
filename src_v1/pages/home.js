import React from "react";
import RouteHandle, { RouteConstants } from "../handle/router/routes"

function onClickPage1() {
  RouteHandle.call(RouteConstants.page_page1,
    {
      arg_key_1 : "value1",
      arg_key_2 : 2,
      arg_key_3 : ["a", "b", 3, "d"],
      arg_key_4 : {
        subkey: "v"
      }
    })
}
  
function onClickPage2() {
  RouteHandle.call(RouteConstants.page_page2)
}

function onClickPageClassComponent() {
  RouteHandle.call(RouteConstants.page_class_component)
}

function onClickPageStaticComponent() {
  RouteHandle.call(RouteConstants.page_static_component)
}

export default function Home() {
    return (
        <div className="App">
          <button onClick={onClickPage1}> Page1 </button>
          <button onClick={onClickPage2}> Page2 </button>
          <button onClick={onClickPageClassComponent}> Page Class Component </button>
          <button onClick={onClickPageStaticComponent}> Page Static Component </button>
        </div>
    );
};
