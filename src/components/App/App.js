import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Parks from '../Parks/Parks';
import Park from '../Park/Park';
import Search from '../Search/Search';
import About from '../About/About';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';

import AppContext from '../../contexts/AppContext'
import { withAppContext } from '../../contexts/AppContext'

import './App.css';

class App extends Component {
   static contextType = AppContext;

  state = {
    loggedIn: true,
    sideNav: true,
    sideNavClass: "dashboard show-nav"
  }

  renderAuthError = () => {
    return (
      <div className='auth-error'>
        <span role='img' aria-label='bad news icon' className='emoji'>😞</span>
        <h4>Oh no!</h4>
        <p>
          There was an error trying to fetch your user information.
        </p>
        <p>
          Try logging out and back in to see if the problem resolves itself.
        </p>
      </div>
    )
  }

  render() {
    const { parks, park, showLogin, showModal,  showModalFunc, hasAuth } = this.context;
    if (showModal) {
      return (
        <Router>
          <Signup />
        </Router>
      );
    } else if (showLogin) {
      return (
      <Router>
        <Login />
      </Router>
      );
    } else {
      return ( 
        <Router>
          <div className="App">
            <Navbar />
            {hasAuth ? <Dashboard /> : null}
            <div className="container">
            <Switch>
              <Route
              exact
              path='/'
              render={ props => (
                <Fragment>
                    
                    {hasAuth ? <div>
                    <h1>How to Create Your National Park List:</h1>
                    <p className="landing-text first">1. Make a search for a national park based on anything.  Seach by State, activities, weather, city, lat/long coordinates, etc.</p>
                    <p className="landing-text">2. The app will provide information for United States National Parks relating to your search.</p>
                    <p className="landing-text">3. On search results, click "more" to learn more about a given park.</p>
                    <p className="landing-text">4. click "Add Park To List" to add a park to your list</p>
                    </div> : null}
                    <div className="text-container">
                    
                    {!hasAuth ? 
                    <div>
                    <h1>Welcome to National Park List!</h1>
                    <p className="landing-text first">1. Make a search for a national park based on anything.  Seach by State, activities, weather, city, lat/long coordinates, etc.</p>
                    <p className="landing-text">2. The app will provide information for United States National Parks relating to your search.</p>
                    <p className="landing-text">3. On search results, click "more" to learn more about a given park.</p>
                    <p className="landing-text last">4. To create your own National Park list and add parks to your list, click "Sign Up".</p>
                    <button className="cta-btn" id="open" onClick={showModalFunc}>Sign Up</button>
                    </div> : null}
                    </div>
                  <Search
                    showClear={(parks.data && parks.data.length> 0 ) ? true : false }/>
                  <Parks parks={parks.data} />
                </Fragment>
              )}>
              </Route>
              <Route exact path='/about' component={About}/>
              <Route 
                exact 
                path='/park/:parkCode' 
                render={props => (
                  <Park
                    {...props} 
                    park={park}
                  />
                )} 
              />
                
            </Switch>
            </div>
          </div>  
        </Router>
        )
      }
    }
}

export default withAppContext(App);