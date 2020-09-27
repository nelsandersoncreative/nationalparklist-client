import React, { Component, Fragment } from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { withAppContext } from '../../contexts/AppContext';
import Activities from '../Activities/Activities';
import AppContext from '../../contexts/AppContext';
import Spinner from '../Spinner/Spinner';
import './Park.css';


const toKelvin = temp => Math.floor((temp - 273.15)* 1.8000+ 32.00) + ' °F';

const formatPhoneNumber = number => {
  const isFormatted = n => n[0] === '(' || n[3] === '.' || n[3] === '-';
  const format = n => '(' + n.slice(0, 3) + ') ' + n.slice(3, 6) + '-' + n.slice(6);
  return number && number.length ? isFormatted(number) ? number : format(number) : 'No phone number available';
}


class Park extends Component {

  static contextType = AppContext;

  componentDidMount() {
    this.context.getPark(get(this.props, 'match.params.parkCode', null));
  }

  componentDidUpdate(prevProps) {
    const code = get(this.props, 'match.params.parkCode', null);
    const previousCode = get(prevProps, 'match.params.parkCode', null);
    if(code && code !== previousCode) {
      this.context.getPark(code);
    }
  }

  renderLoading = () => (
    <div>
      <h3>Retrieving Park Data...</h3>
      <Spinner />
    </div>
  )

  render() {
    const { addParkToList, currentWeather, hasAuth, showModalFunc } = this.context;
    const park = get(this.props, 'park.data[0]');

    if (!park || this.props.loading) return this.renderLoading();

    const {
      activities,
      fullName: parkName,
      description,
      directionsInfo,
      parkCode,
      url
    } = park;
    const city = get(park, 'addresses[0].city', 'No city available');
    const currentTemp = toKelvin(currentWeather);
    const state = get(park, 'addresses[0].stateCode', 'No state available');
    const latLong = get(park, 'latLong', 'No lat/long coordinates available');
    const designation = get(park, 'designation', 'No designation available');
    const emailAddress = get(park, 'contacts.emailAddresses[0].emailAddress', 'No email address available');
    const entrenceFee = get(park, 'entranceFees[0].title', 'No entrance fee information available');
    const imageUrl = get(park, 'images[0].url');
    const operatingHours = get(park, 'operatingHours[0].description', 'No operating hours available');
    const parkObject = { parkCode, parkName, parkCity: `${city}, ${state}` };
    const phoneNumber = formatPhoneNumber(get(park, 'contacts.phoneNumbers[0].phoneNumber'));

    return (
        <Fragment>
          <Link to='/' className='btn btn-light'>Back to Search</Link>
          Entrance fee: {entrenceFee}
          <div className="className card grid-2">
            <div className="all-center">
              { <img src={imageUrl} className="round-img" alt="" style={{ width: "150px", height: "150px" }}/> }
              <h1>{parkName}</h1>
              <p>Location: {city}, {state}</p>
              <p>Current Temperature: {currentTemp} </p>
            </div>
            <div>
              {description &&
                <Fragment>
                  <button
                    className="btn btn-dark my-1"
                    onClick={hasAuth ? () => addParkToList(parkObject) : () => showModalFunc(true)}
                  >
                    <i className="fas fa-plus"></i> Add this park to my list
                  </button>
                  <h3>Description</h3>
                  <p className="parkDescription">{description}</p>
                </Fragment>
              }
              <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-dark my-1">Visit the {parkName} website</a>
              <ul>
                <li>
                  {operatingHours &&
                    <Fragment>
                      <h3>Operating Hours</h3> 
                      <p className="park-info">{operatingHours}</p>
                    </Fragment>
                  }
                </li>
                <li>
                  {directionsInfo &&
                    <Fragment>
                      <h3>Directions</h3>
                      <p className="park-info">{directionsInfo}</p>
                    </Fragment>
                  }
                </li>
              </ul>
            </div>
          </div>
          <div className="park-contact-info">
            <div className="badge badge-primary">{phoneNumber}</div>
            <div className="badge badge-success">{emailAddress}</div>
            { designation && <div className="badge badge-light">{designation}</div> }
            <div className="badge badge-dark">{latLong}</div>
          </div>
          <Activities activities={activities}/>
        </Fragment>
    )
  }
}

export default withAppContext(Park);
