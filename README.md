### v2
- Store context data at local storage

##### TODO
- Hide localstorage data
- hook background.js disconnect event, but...

##### How to use
```javascript
// ./handle/router/router.js
// import pages
import Home from "../../pages/home"
import TestPage1 from "../../pages/TestPage1"
import TestPage2 from "../../pages/TestPage2"
import NotFoundTest from "../../pages/NotFoundTest"
import Page404 from "../../pages/page404"
```

```javascript
// ./handle/router/router.js
// export default class RouteHandler {
// ...
// add fetch pages
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
```

```javascript
// ./handle/router/router.js
// add route names
class RouteConstants {
    static routeMap = {
        '/': 'home',
        '/page1': 'page1',
        '/page2': 'page2',
        '/NotFoundTest': 'notfoundtest'
    }
}
```

```javascript
// ./App.js
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      flag: true
    }
    this.updateCallback = this.updateCallback.bind(this)
  }

  updateCallback() {
    this.setState({ flag: !this.state.flag })
  }

  componentWillMount() {
    RouteHandler.init(this.updateCallback)
  }

  // TODO: this function never reached...
  componentWillUnmount() {

  }

  render() {
    return RouteHandler.fetch()
  }
}
```

---
### v1 Workflow

##### 1. create-react-app

##### 2. change ./public/manifest.json for extension

##### 3. coding

##### 4. build : npm run build

##### 5. add extension : chrome://extensions dev mode + build path

##### 6. run extension
