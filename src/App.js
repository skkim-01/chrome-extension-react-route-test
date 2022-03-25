import { useState, useEffect } from "react";
import RouteHandle from "./handle/router/routes";

export default function App() {
  // store routeName: page  
  const [routeName, setRouteName] = useState("/")  
  useEffect(()=>{    
    // set callbackfunction for route page
    RouteHandle.setDispatcherCB(changePageCB)
  }, [])

  // refresh callback function : update route 
  function changePageCB(next) {
    // update useState
    setRouteName(next)
  }

  // dispatch page with routename
  function DispatchRouter() {
    // dispatch page
    return RouteHandle.Dispatch(routeName)    
  }

  return DispatchRouter()
}