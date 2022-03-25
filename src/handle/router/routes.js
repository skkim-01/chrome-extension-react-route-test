import Page1 from "../../pages/page1"
import Page2 from "../../pages/page2"
import Home from "../../pages/home"
import ClassComponent from "../../pages/page_class_component"
import ClassComponentStatic from "../../pages/page_class_component_static"

export class RouteConstants {
    static page_home = "/"
    static page_page1 = "/page1"
    static page_page2 = "/page2"
    static page_class_component = "/page/class/component"
    static page_static_component = "/page/static/component"
}

export default class RouteHandle {
    static dispatcherCB = null
    static staticComponentClass = new ClassComponentStatic()

    // using only main
    static setDispatcherCB(cbFunc) {
        this.dispatcherCB = cbFunc
    }

    static call(next, args) {
        // TODO: Validate args format...
        this.dispatcherCB(next, args)
    }    

    // using only main
    static Dispatch(routeName, args = {}) {
        switch ( routeName ) {
        case RouteConstants.page_home:                  return Home(args)
        case RouteConstants.page_page1:                 return Page1(args)
        case RouteConstants.page_page2:                 return Page2(args)
        // when using React.Component class..
        case RouteConstants.page_class_component:       return new ClassComponent().render(args)
        // when using React.Component class as static variable
        case RouteConstants.page_static_component:      return this.staticComponentClass.render(args)
        default:                                        return Home(args)
        }
    }
}
