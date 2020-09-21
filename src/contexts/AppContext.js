import React, {Component, createContext} from 'react'
import axios from 'axios';
import config from '../config';

// import AuthApiService from '../services/auth-api-service';
import TokenService from '../services/TokenService'

//1. initialize context
const AppContext = createContext({
  hasAuth: false,
  currentUserId: null,
  currentUser: null,
  userParkList: [],
  userParkListStarted: false,
  error: null,
  isLoading: false,
  showModal: false,
  showLogin: false,
  parks: [],
  park: {},
  currentWeather: 'weather',
  logout: () => {},
  login: () => {},
  setCurrentUser: () => {},
  getCurrentUser: () => {},
  getUserParks: () => {},
  clearError: () => {},
  setLoading: () => {},
  searchParks: () => {},
  getCurrentWeather: () => {},
  getLat: () => {},
  getLong: () => {},
  clearParks: () => {},
  getPark: () => {},
  resetPark: () => {},
  addParkToList: () => {},
  removeParkFromList: () => {},
  showModalFunc: () => {},
  hideModalFunc:() => {},
  showLoginFunc: () => {},
  hideLoginFunc: () => {},
  showSideNav: () => {},
  hideSideNav: () => {}
});
export default AppContext

//2. context provider
export class AppProvider extends Component {
  state = {
    hasAuth: false,
    currentUserId: null,
    currentUser: null,
    userParkListStarted: null,
    error: null,
    isLoading: false,
    showLogin: false,
    showModal: false,  
    currentWeather: 'weather',
    parks: [],
    park: {},
    userParkList: [
    ]
  }

  // async componentDidMount() {
  //   this.getCurrentUser()
  //  }
 
  // async getCurrentUser() {
  //   if (TokenService.hasAuthToken()) {
  //     try {
  //       const user = await AuthApiService.getCurrentUser()
  //       this.setState({currentUser: user})
  //     } catch(err) {
  //       this.setState({error: err.message})
  //     }
  //   }
  // }

  setCurrentUser = userObject => {
    this.setState({ currentUser: userObject });
    this.setState({ currentUserId: userObject.id });
  }
   
  login = (token) => {
    TokenService.saveAuthToken(token)
    this.setState({ hasAuth: true })
  }

  logout = () => {
    TokenService.clearAuthToken()
    this.setState({ hasAuth: false, userParkList: [] })
  }

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
  

  clearError = () => {
    this.setState({error: null})
  }

  setLoading = bool => {
    this.setState({isLoading: bool})
  }

  setShowModal = bool => {
    this.setState({showModal: bool})
  }

  setShowLogin = bool => {
    this.setState({showLogin: bool})
  }

  searchParks = async (text) => {
    this.setState({ isLoading: true });
    const res = await axios.get(`https://developer.nps.gov/api/v1/parks?q=${text}&${process.env.REACT_APP_API_KEY}`);
    if (res.data) {
      this.setState({ parks: res.data, isLoading: false });
    }  
  }

  getCurrentWeather = async (latitude, longitude) => {
    if (latitude && longitude) {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&${process.env.REACT_APP_OPENWEATHER_API_KEY}`);
      this.setState({ currentWeather: res.data.main.temp })
    } else {
      return 'current weather not available at this time.';
    }
  }
  
  getLat(coords) {
    const lat = 'lat:'
    const indexOfLat = coords.indexOf(lat) + 4;
    
    if (coords[indexOfLat] === '-') {
      return coords.slice(indexOfLat, (indexOfLat + 3));
    } else if (lat[indexOfLat] !== '-') {
      return coords.slice(indexOfLat, (indexOfLat + 2));
    }
  }

  getLong(coords) {
    const long = 'long:';
    const indexOfLong = coords.indexOf(long) + 5;
    
    if (coords[indexOfLong] === '-') {
      return coords.slice(indexOfLong, (indexOfLong + 3));
    } else if (coords[indexOfLong] !== '-') {
      return coords.slice(indexOfLong, (indexOfLong + 2));
    }
  }

  clearParks = () => this.setState({ parks: [], isLoading: false })

  resetPark = () => this.setState({ park: []})

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

  addParkToList = async parkObject => {
    
    // const filler = this.state.userParkList[0].parkCode;
    // if (filler === 'xxxx' ) {
      
    //   const { parkCode } = parkObject;
    //   try {
       
    //     //remove xxxx placeholder
    //     const remove = await fetch(`${config.API_ENDPOINT}/user-parks/remove-park/xxxx`, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${TokenService.getAuthToken()}`
          
    //       },
    //       body: JSON.stringify({
    //         id: this.state.currentUser.id,
    //         index: '0'
    //       })
    //     });
    //     const removed = await remove.json()
    //     // const oldArray = this.state.userParkList;
    //     // oldArray.splice(0, 1);
    //     // this.setState({ userParkList: oldArray });
    //     try {
    //     //add new park
    //     const res = await fetch(`${config.API_ENDPOINT}/user-parks/add-park/${parkCode}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${TokenService.getAuthToken()}`
        
    //     },
    //     body: JSON.stringify({
    //       id: this.state.currentUserId
    //     })
    //   })
    //   this.setState({ userParkList: [parkObject] });
    //   const result = await res.json();
    //   return { result: result, removed: removed};    
      
    //   } catch (err) {
    //     console.error({ msg: err });
    //   }
    // } else {
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
  
  // record the index of the item clicked, obtain current list, splice it out, reset state with new length
  removeParkFromList = async (arrayIndex, parkCode) => {
    // if (this.state.userParkList.length === 1) {
    //   this.addParkToList(
    //     {
    //        parkCode: "xxxx",
    //        parkName: "Your park list will display here",
    //        parkCity: "once you add parks to it!"
    //      }
    //    );
    // }
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
    return result;
  }

  clearParks = () => this.setState({ parks: [], loading: false })

  showModalFunc = () => {
    this.setState({ showModal: true, showLogin: false });
  }

  hideModalFunc = () => {
    this.setState({ showModal: false });
  }

  showLoginFunc = () => {
    this.setState({ showLogin: true, showModal: false });
  }

  hideLoginFunc = () => {
    this.setState({ showLogin: false });
  }
  
  showSideNav = () => {
    this.setState({ sideNav: true, sideNavClass: "dashboard show-nav" });
  }

  hideSideNav = () => {
    this.setState({ sideNav: false, sideNavClass: "dashboard" });
  }

  render() {
    return (
      <AppContext.Provider value={{
        ...this.state,
        login: this.login,
        logout: this.logout,
        getUserParks: this.getUserParks,
        setCurrentUser: this.setCurrentUser,
        getCurrentUser: this.getCurrentUser,
        clearError: this.clearError,
        setLoading: this.setLoading,
        showModalFunc: this.showModalFunc,
        hideModalFunc: this.hideModalFunc,
        showLoginFunc: this.showLoginFunc,
        hideLoginFunc: this.hideLoginFunc,
        getPark: this.getPark,
        searchParks: this.searchParks,
        clearParks: this.clearParks,
        resetPark: this.resetPark,
        addParkToList: this.addParkToList,
        removeParkFromList: this.removeParkFromList,
        getCurrentWeather: this.getCurrentWeather,
        getLat: this.getLat, 
        getLong: this.getLong,
        showSideNav: this.showSideNav,
        hideSideNav: this.hideSideNav
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