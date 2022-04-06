// import target pages
import Home from "../../pages/home"
import TestPage1 from "../../pages/TestPage1"
import TestPage2 from "../../pages/TestPage2"

import RouteInstance from "./instance"

export default class RouteHandler {
    static init(updateCB) {
        RouteInstance.getInstance().setUpdateCB(updateCB)
        RouteInstance.getInstance().buildContextMap()
        RouteInstance.getInstance().loadFromLocalStorage()
    }

    // fetch page
    static fetch() {
        switch ( RouteInstance.getInstance().getCurrent() ) {            
            case '/':
                return new Home()

            case '/page1':
                if( !RouteInstance.getInstance().getClass() ) {
                    RouteInstance.getInstance().setClass(
                        new TestPage1(RouteInstance.getInstance().
                            getContext('/page1'))
                    )
                }
                return RouteInstance.getInstance().getClass().render()

            case '/page2':
                if( !RouteInstance.getInstance().getClass() ) {
                    RouteInstance.getInstance().setClass(
                        new TestPage2(RouteInstance.getInstance().
                            getContext('/page2'))
                    )
                }
                return RouteInstance.getInstance().getClass().render()

            default:                
                window.alert("ERORR_ROUTE")
        }
    }

    static getContext(routeName) {
        RouteInstance.getInstance().getContext(routeName)
    }

    static setCurrent(routeName) {
        RouteInstance.getInstance().setCurrent(routeName)
    }

    // update current page
    static update(context={}, clear=false) {
        if (clear) {
            RouteInstance.getInstance().clearContext(RouteInstance.getInstance().getCurrent())
        }
        RouteInstance.getInstance().updateContext(RouteInstance.getInstance().getCurrent(), context)
        RouteInstance.getInstance().invokeUpdateCB()
    }

    static move(currentContext={}, next, nextContext={}) {        
        RouteInstance.getInstance().updateContext(RouteInstance.getInstance().getCurrent(), currentContext)
        RouteInstance.getInstance().updateContext(next, nextContext)
        RouteInstance.getInstance().setCurrent(next)
        RouteInstance.getInstance().invokeUpdateCB()
    }
    
    static clearCurrentContext() {        
        this.update(null, true)
    }

    static clearAll() {
        RouteInstance.getInstance().clearContextMap()
        this.update(null)
    }
}