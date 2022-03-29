import { useState, useEffect } from "react";
import RouteHandle from "./handle/router/routes";
import useToggle from "./handle/router/usetoggle";

export default function App() {
  const [routeName, setRouteName] = useState("/")
  const [routeArgs, setRouteArgs] = useState({})
  const [refreshFlag, setRefreshFlag] = useToggle()

  useEffect(()=>{
    RouteHandle.setDispatcherCB(ChangePageCB)
    RouteHandle.setUpdaterCB(UpdatePageCB)
  }, [])

  function ChangePageCB(next, args) {    
    setRouteName(next)
    setRouteArgs(args)
  }
  
  function UpdatePageCB() {
    setRefreshFlag()
  }

  function DispatchRouter() {    
    return RouteHandle.Dispatch(routeName, routeArgs)
  }

  return DispatchRouter()
}