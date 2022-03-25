// define pages
import Page1 from "../../pages/page1";
import Page2 from "../../pages/page2";
import Home from "../../pages/home";

// add page address string
export class RouteConstants {
    static page_home = "/"
    static page_page1 = "/page1"
    static page_page2 = "/page2"
}

export default class RouteHandle {
    static dispatcherCB = null

    static setDispatcherCB(cbFunc) {
        console.log("setDispatcherCB called")
        this.dispatcherCB = cbFunc
    }

    static call(next) {
        this.dispatcherCB(next)
    }    
    
    // add dispatch class: IT MUST USE APP. DO NOT USE OTHER PLACE
    static Dispatch(routeName) {
        switch ( routeName ) {
            case RouteConstants.page_home:        return Home()
            case RouteConstants.page_page1:       return Page1()
            case RouteConstants.page_page2:       return Page2()
            default:                              return Home()
        }
    }
}
