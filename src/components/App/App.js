import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Instructions from '../Instructions/Instructions';
import Parks from '../Parks/Parks';
import Park from '../Park/Park';
import Search from '../Search/Search';
import About from '../About/About';
import Signup from '../Signup/Signup';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';
import AppContext, { withAppContext } from '../../contexts/AppContext';

import './App.css';

// main screen of app
class App extends Component {
  static contextType = AppContext;

  // This error reners if there are any errors with Authorization
  renderAuthError = () => (
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

  // render navbar
  // login and signup forms are modal pop-ups
  // render dashboard if logged in, don't render if not logged in
  // render search bar and search results for parks
  render() {
    const {
      parks, park, showLogin, showModal, showModalFunc, hasAuth,
    } = this.context;

    if (showModal) {
      return (
        <Router>
          <Signup />
        </Router>
      );
    } if (showLogin) {
      return (
        <Router>
          <Login />
        </Router>
      );
    } return (
      <Router>
        <div className='App'>
          <Navbar />
          {hasAuth ? <Dashboard /> : null}
          <div className='container'>
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Fragment>
                    { hasAuth ? <Instructions /> : null}
                    <div className='text-container'>
                      {!hasAuth
                        ? (
                          <div className='first-visit-welcome'>
                            <h1>Welcome to National Park List!</h1>
                            <div className='demo-grid'>
                              <div className='demo-cred-container'>
                                <h2 className='landing-demo'>Demo Login Account</h2>
                                <p className='landing-demo'>Email:  sampleuser@sampleuser.com</p>
                                <p className='landing-demo'>Password:  foobar</p>
                                <br />
                                <p className='landing-demo'>Log in to see this app&apos;s onboarding experience.</p>
                              </div>
                            </div>
                            <div>
                              <p className='landing-text first'>1. Make a search for a national park based on anything.  Seach by State, activities, weather, city, lat/long coordinates, etc.</p>
                              <p className='landing-text'>2. The app will provide information for United States National Parks relating to your search.</p>
                              <p className='landing-text'>3. On search results, click &quot;more&quot; to learn more about a given park.</p>
                              <p className='landing-text last'>4. To create your own National Park list and add parks to your list, click &quot;Sign Up&quot;.</p>
                              <button type='button' className='cta-btn home-signup' id='open' onClick={showModalFunc}>Sign Up</button>
                            </div>
                          </div>
                        ) : null}
                    </div>
                    <Search
                      showClear={!!((parks.data && parks.data.length > 0))}
                    />
                    <Parks parks={parks.data} />
                  </Fragment>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/park/:parkCode'
                render={(props) => (
                  <Park {...props} park={park} />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default withAppContext(App);
