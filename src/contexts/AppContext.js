import React, {Component, createContext} from 'react';
import axios from 'axios';
import config from '../config';

import TokenService from '../services/TokenService';
import Utils from '../services/Utils';

//1. initialize context
const AppContext = createContext({
  currentUserId: null,
  currentUser: null,
  currentWeather: 'weather',
  error: null,
  hasAuth: false,
  isLoading: false,
  park: {},
  parks: [],
  showModal: false,
  showLogin: false,
  showInstructions: false,  
  showDashboard: false,
  userParkList: [],
  addParkToList: () => {},
  clearError: () => {},
  clearParks: () => {},
  getCurrentUser: () => {},
  getCurrentWeather: () => {},
  getLat: () => {},
  getLong: () => {},
  getPark: () => {},
  getUserParks: () => {},
  hideModalFunc:() => {},
  hideLoginFunc: () => {},
  logout: () => {},
  login: () => {},
  refreshParkPage: () => {},
  removeParkFromList: () => {},
  searchParks: () => {},
  setCurrentUser: () => {},  
  setLoading: () => {},
  showModalFunc: () => {},
  showLoginFunc: () => {}
});

export default AppContext

//2. context provider
export class AppProvider extends Component {
  state = {
    currentUserId: null,
    currentUser: null,
    currentWeather: 'weather',
    error: null,
    hasAuth: false,
    isLoading: false,
    park: {},
    parks: [],
    showDashboard: false,
    showInstructions: false,  
    showLogin: false,
    showModal: false,
    userParkList: []
  }

  // sets currentUser and currentUserId values in state
  setCurrentUser = userObject => {
    this.setState({ currentUser: userObject });
    this.setState({ currentUserId: userObject.id });
  }
   
  // logs the user in, giving them authorization after receiving an auth token
  login = (token) => {
    TokenService.saveAuthToken(token)
    this.setState({ hasAuth: true })
  }

  // clears the user's auth token after they log out
  logout = () => {
    TokenService.clearAuthToken()
    this.setState({ hasAuth: false, userParkList: [] })
  }

  // fetches the user's park list, obtaining relevant info from the National Parks API
  getUserParks = async id => {

    //GET request for user parks
    const res = await fetch(`${config.API_ENDPOINT}/user-parks/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      }
    })

    //throw an error if the response isn't ok
    if (!res.ok) {
      return res.json().then(e => Promise.reject(e))
    }

    let result = await res.json();

     if (result.length) {

      const parkCodeArray = result[0].parks;
      let parksArray = [];
      const originalParkListLength = parkCodeArray.length;

      // get the info for each park in the list, create a park object to store in DB
      parkCodeArray.forEach(async parkCode => {        
          const res = await axios.get(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&${process.env.REACT_APP_API_KEY}`);
          const park = await res.data.data[0];

          const parkObject = {
            parkCode: parkCode,
            parkName: park.fullName,
            parkCity: `${park.addresses[0].city}, ${park.addresses[0].stateCode}`
          }

          parksArray.push(parkObject);
          const parksArrayLength = parksArray.length;

          if(originalParkListLength === parksArrayLength) {
            this.setState({ userParkList: parksArray, showLogin: false, showModal: false });
            this.setLoading(false);
          }
      });
    }
    this.setState({ showLogin: false, showModal: false });
    this.setLoading(false);
  }
  
  // clear any errors
  clearError = () => {
    this.setState({error: null})
  }

  // handles communicating to the user if a component or data is loading
  setLoading = bool => {
    this.setState({isLoading: bool})
  }

  // show/hide or signup form
  setShowModal = bool => {
    this.setState({showModal: bool})
  }
 // show/hide or login form
  setShowLogin = bool => {
    this.setState({showLogin: bool})
  }

  // search the National Park API database for data relating to a query
  searchParks = async (text) => {
    this.setState({ isLoading: true });
    const res = await axios.get(`https://developer.nps.gov/api/v1/parks?q=${text}&${process.env.REACT_APP_API_KEY}`);
    if (res.data) {
      this.setState({ parks: res.data, isLoading: false });
    }  
  }

  // get current weather via the OpenWeather API using longitude/latitude
  getCurrentWeather = async (latitude, longitude) => {
    if (latitude && longitude) {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&${process.env.REACT_APP_OPENWEATHER_API_KEY}`);
      this.setState({ currentWeather: res.data.main.temp })
    } else {
      return 'current weather not available at this time.';
    }
  }
  
  // fetch latitude coordinates for a given park.
  getLat(coords) {
    const lat = 'lat:'
    const indexOfLat = coords.indexOf(lat) + 4;
    
    if (coords[indexOfLat] === '-') {
      return coords.slice(indexOfLat, (indexOfLat + 3));
    } else if (lat[indexOfLat] !== '-') {
      return coords.slice(indexOfLat, (indexOfLat + 2));
    }
  }

  // fetch longitude coordinates for a given park.
  getLong(coords) {
    const long = 'long:';
    const indexOfLong = coords.indexOf(long) + 5;
    
    if (coords[indexOfLong] === '-') {
      return coords.slice(indexOfLong, (indexOfLong + 3));
    } else if (coords[indexOfLong] !== '-') {
      return coords.slice(indexOfLong, (indexOfLong + 2));
    }
  }

  // clear search results from a home page search
  clearParks = () => this.setState({ parks: [], isLoading: false })

  // get park information from the National Parks API when a user clicks on a park's "More" button or the Park name link in the dashboard.
  getPark = async parkCode => {
    this.setState({ isLoading: true });
    const res = await axios.get(`https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&${process.env.REACT_APP_API_KEY}`);

    if (res.data) {
      const latitude = this.getLat(res.data.data[0].latLong);
      const longitude = this.getLong(res.data.data[0].latLong);
      this.getCurrentWeather(latitude, longitude);
      this.setState({park: res.data, isLoading: false });
    }  
  };

  // handles when user presses the "add park to list" button
  addParkToList = async parkObject => {
    const { parkCode } = parkObject;
    try {
    const res = await fetch(`${config.API_ENDPOINT}/user-parks/add-park/${parkCode}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      
      },
      body: JSON.stringify({
        id: this.state.currentUserId
      })
    })
    this.setState({ userParkList: [...this.state.userParkList, parkObject] });
    const result = await res.json();
    return result;    
  } catch (err) {
    console.error({ msg: err });
  }
}
  
  // handles whether a user has added a park to their dashboard, allowing to conditionally render "add park to list button"
  refreshParkPage = parkItemCode => {
    const parkFound = Utils.userParkSearch(parkItemCode, this.state.userParkList);
      if (parkFound) {
      console.log('parkFound: ', parkFound);
      return true;
    } else {
      return false;
    }
  }

  // remove park from a user's park list
  // record the index of the item clicked, obtain current list, splice it out, reset state with new length
  removeParkFromList = async (arrayIndex, parkCode) => {
    const res = await fetch(`${config.API_ENDPOINT}/user-parks/remove-park/${parkCode}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      
      },
      body: JSON.stringify({
        id: this.state.currentUserId,
        index: `${arrayIndex}`
      })
    })
    const oldArray = this.state.userParkList;
    oldArray.splice(arrayIndex, 1);
    this.setState({ userParkList: oldArray });
    const result = await res.json();
    this.refreshParkPage(parkCode);
    return result;
  }

  //show signup form
  showModalFunc = () => {
    this.setState({ showModal: true, showLogin: false });
  }

  //hide signup form
  hideModalFunc = () => {
    this.setState({ showModal: false });
  }

  //show login form
  showLoginFunc = () => {
    this.setState({ showLogin: true, showModal: false });
  }

  //hide login form
  hideLoginFunc = () => {
    this.setState({ showLogin: false });
  }

  render() {
    return (
      <AppContext.Provider value={{
        ...this.state,
        addParkToList: this.addParkToList,
        clearError: this.clearError,
        clearParks: this.clearParks,
        getUserParks: this.getUserParks,
        setCurrentUser: this.setCurrentUser,
        getCurrentUser: this.getCurrentUser,
        getCurrentWeather: this.getCurrentWeather,
        getLat: this.getLat, 
        getLong: this.getLong,
        getPark: this.getPark,
        hideLoginFunc: this.hideLoginFunc,
        hideModalFunc: this.hideModalFunc,
        login: this.login,
        logout: this.logout,
        refreshParkPage: this.refreshParkPage,
        removeParkFromList: this.removeParkFromList,
        searchParks: this.searchParks,
        setLoading: this.setLoading,
        showLoginFunc: this.showLoginFunc,
        showModalFunc: this.showModalFunc
      }}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

//3. context consumer
export const withAppContext = Component => (
  props => (
    <AppContext.Consumer>
      {context => <Component appContext={context} {...props} />}
    </AppContext.Consumer>
  )
)