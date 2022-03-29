// change to singleton class

// import target pages
import Home from "../../pages/home"
import TestPage1 from "../../pages/TestPage1"
import TestPage2 from "../../pages/TestPage2"
import NotFoundTest from "../../pages/NotFoundTest"
import Page404 from "../../pages/page404"


export default class RouteHandler {
    // must initailize from main
    static init(updateCB) {
        RouteData.setUpdateCB(updateCB)
        RouteData.buildContextMap()
        RouteData.setInitialized(true)
    }

    static isInit() {
        return RouteData.isInitialized()
    }

    // get context data by routeName
    static getContext(routeName) {
        return RouteData.getContext(routeName)
    }

    // update current page
    static update(context={}, clear=false) {
        if (clear) {
            RouteData.clearContext(RouteData.getCurrent())
        }
        RouteData.updateContext(RouteData.getCurrent(), context)        
        // TODO: store contextMap at localstorage
        RouteData.invokeUpdateCB()
    }

    // route other page: overload?
    static move(currentContext={}, next, nextContext={}) {        
        RouteData.updateContext(RouteData.getCurrent(), currentContext)
        RouteData.updateContext(next, nextContext)
        RouteData.setCurrent(next)
        RouteData.invokeUpdateCB()
    }

    static clearCurrentContext() {
        //RouteData.clearContext(RouteData.getCurrent())        
        this.update(null, true)
    }

    static clearAll() {
        RouteData.clearContextMap()
        this.update(null)
    }

    // fetch page
    static fetch() {
        //dbg print
        console.log(`[dbg] route: ${RouteData.getCurrent()}`)
        console.log(`[dbg] contextMap: ${JSON.stringify(RouteData.contextMap)}`)

        switch ( RouteData.getCurrent() ) {
            case '/': 
                return Home(RouteData.getContext('/'))
            case '/page1':
                return new TestPage1(RouteData.getContext('/page1')).render()
            case '/page2':
                return new TestPage2(RouteData.getContext('/page2')).render()
            case '/NotFoundTest':
                return NotFoundTest()
            default: 
                return Page404()
        }
    }
}

// define route name
class RouteConstants {
    static routeMap = {
        '/': 'home',
        '/page1': 'page1',
        '/page2': 'page2',
        '/NotFoundTest': 'notfoundtest'
    }
}

class RouteData {
    static initialized = false
    static updaterCBFunc = null
    static current = '/'
    static contextMap = {}

    static setInitialized(b) {
        this.initialized = b
    }

    static isInitialized() {
        return this.initialized
    }

    static setCurrent(next) {
        this.current = next
    }

    static getCurrent() {
        return this.current
    }

    static setUpdateCB(cbFunc) {
        this.updaterCBFunc = cbFunc
    }

    static invokeUpdateCB() {
        this.updaterCBFunc()
    }

    static buildContextMap() {
        Object.keys(RouteConstants.routeMap).forEach( (key) => {
            this.contextMap = {
                ...this.contextMap,
                [key]: {}
            }
        })
    }

    static getContext(routeName) {
        return this.contextMap[routeName]
    }

    static updateContext(routeName, context) {
        if ( context && context != {} ) {
            Object.keys(context).forEach( (key) => {
                this.contextMap[routeName] = {
                    ...this.contextMap[routeName],
                    [key]: context[key]
                }
            })
        }        
    }

    static clearContext(routeName) {
        this.contextMap[routeName] = {}
    }

    static clearContextMap() {
        this.contextMap = {}
        this.buildContextMap()
    }
}