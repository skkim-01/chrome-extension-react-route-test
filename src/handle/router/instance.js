class StaticPages {
    static classTestPage1 = null
    static classTestPage2 = null
    
    routeMap = {
        '/': 'home',
        '/page1': this.classTestPage1,
        '/page2': this.classTestPage2
    }
}

export default class RouteInstance {
    staticPages = new StaticPages()
    updaterCBFunc = null
    current = '/'
    contextMap = {}

    static _Instance = null;

    static getInstance() {
        if ( RouteInstance._Instance == null ) {
            RouteInstance._Instance = new RouteInstance();
        }
        return this._Instance;
    }

    getClass() {
        return this.staticPages.routeMap[this.current]
    }

    setClass(classObject) {
        this.staticPages.routeMap[this.current] = classObject
    }

    setCurrent(next) {
        this.current = next
    }

    getCurrent() {
        return this.current
    }

    setUpdateCB(cbFunc) {
        this.updaterCBFunc = cbFunc
    }

    invokeUpdateCB() {
        this.updaterCBFunc()
    }

    buildContextMap() {
        console.log("[dbg] buildContextMap()")
        Object.keys(this.staticPages.routeMap).forEach( (key) => {
            this.contextMap = {
                ...this.contextMap,
                [key]: {}
            }
        })
    }

    getContext(routeName) {
        return this.contextMap[routeName]
    }

    updateContext(routeName, context) {
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

    clearContext(routeName) {
        this.contextMap[routeName] = {}
        this.staticPages.routeMap[routeName] = null
        this.#_saveContextMap()
    }

    clearContextMap() {
        this.staticPages = null
        this.staticPages = new StaticPages()
        this.contextMap = {}
        this.buildContextMap()
        this.#_saveContextMap()
    }

    loadFromLocalStorage() {
        const tmLastUpdated = window.localStorage.getItem("timestamp")
        const tmCurrent = new Date().getTime() / 1000

        if ( tmCurrent-tmLastUpdated < 60*5 ) {
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
        // TODO: REMOVE
        this.current = '/'
    }

    // private. handle localstorage
    #_saveRouteName() {
        window.localStorage.setItem("current", this.current)
        window.localStorage.setItem("timestamp", new Date().getTime() / 1000)
    }

    #_saveContextMap() {
        window.localStorage.setItem("contextmap", JSON.stringify(this.contextMap))
        window.localStorage.setItem("timestamp", new Date().getTime() / 1000)
    }
}