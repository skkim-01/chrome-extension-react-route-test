// import target pages
import Home from "../../pages/home"
import TestPage1 from "../../pages/TestPage1"
import TestPage2 from "../../pages/TestPage2"

export default class RouteHandler {
    // must initailize from main
    static init(updateCB) {
        RouteData.setUpdateCB(updateCB)
        RouteData.buildContextMap()
        RouteData.loadFromLocalStorage()
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
                if( !SClasses.classTestPage1 ) {
                    SClasses.classTestPage1 = new TestPage1(RouteData.getContext('/page1'))
                }
                return SClasses.classTestPage1.render()
            case '/page2':
                if( !SClasses.classTestPage2 ) {
                    SClasses.classTestPage2 = new TestPage2(RouteData.getContext('/page2'))
                }
                return SClasses.classTestPage2.render()
            default: 
                return Home(RouteData.getContext('/'))
        }
    }
}

class SClasses {
    static classTestPage1 = null
    static classTestPage2 = null
}

// define route name
class RouteConstants {
    static routeMap = {
        '/': 'home',
        '/page1': 'page1',
        '/page2': 'page2'
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
        // store changed routerName at localstorage
        this.#_saveRouteName()
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
        this.#_saveContextMap()
    }

    static clearContext(routeName) {
        this.contextMap[routeName] = {}
        this.#_saveContextMap()
    }

    static clearContextMap() {
        this.contextMap = {}
        this.buildContextMap()
        this.#_saveContextMap()
    }

    // private. handle localstorage
    static #_saveRouteName() {
        window.localStorage.setItem("current", this.current)
        window.localStorage.setItem("timestamp", new Date().getTime() / 1000)
    }

    static #_saveContextMap() {
        window.localStorage.setItem("contextmap", JSON.stringify(this.contextMap))
        window.localStorage.setItem("timestamp", new Date().getTime() / 1000)
    }

    static loadFromLocalStorage() {
        const tmLasUpdated = window.localStorage.getItem("timestamp")
        const tmCurrent = new Date().getTime() / 1000

        if ( tmCurrent-tmLasUpdated < 60 ) {
            console.log("[dbg] load previous data from local storage")
            const current = window.localStorage.getItem("current")
            if ( current ) {
                this.current = current
            } else {
                this.#_saveRouteName()
            }
            const contextMap = JSON.parse(window.localStorage.getItem("contextmap"))
            if ( contextMap ) {
                this.contextMap = contextMap
            } else {
                this.#_saveContextMap()
            }
        } else {
            console.log("[dbg] ingnore previous data")
            this.#_saveRouteName()
            this.#_saveContextMap()
        }
    }
}