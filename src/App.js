import { useState, useEffect } from "react";
import RouteHandle from "./handle/router/routes";

export default function App() {
  const [routeName, setRouteName] = useState("/")
  useEffect(()=>{
    RouteHandle.setDispatcherCB(changePageCB)
  }, [])

  function changePageCB(next) {
    setRouteName(next)
  }

  function DispatchRouter() {
    return RouteHandle.Dispatch(routeName)
  }

  return DispatchRouter()
}