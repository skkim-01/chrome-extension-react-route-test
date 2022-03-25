import { useState, useEffect } from "react";
import RouteHandle from "./handle/router/routes";

export default function App() {
  const [routeName, setRouteName] = useState("/")
  const [routeArgs, setRouteArgs] = useState({})

  useEffect(()=>{
    RouteHandle.setDispatcherCB(changePageCB)
  }, [])

  function changePageCB(next, args) {    
    setRouteName(next)
    setRouteArgs(args)
  }

  function DispatchRouter() {    
    return RouteHandle.Dispatch(routeName, routeArgs)
  }

  return DispatchRouter()
}