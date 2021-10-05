import { Route, Switch, withRouter } from 'react-router-dom'
import React from 'react'
import Home from './Home/Home'
import Blogs from './Blogs/Blogs';
import About from './About/About';
class App extends React.Component {
    
    render() {
      const { match, location, history } = this.props;
      return (
        <div className="App">
          <Switch>
              <Route path='/blogs'>
                  <Blogs />
              </Route>
              <Route exact path="/about">
                  <About />
              </Route>
              <Route exact path="/">
                  <Home />
              </Route>
          </Switch>
        </div>
      )
    }
  }
  
  export default withRouter(App);