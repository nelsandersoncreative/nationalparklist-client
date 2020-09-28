import React, { Component, Fragment } from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppContext, { withAppContext } from '../../contexts/AppContext';
import Activities from '../Activities/Activities';
import Spinner from '../Spinner/Spinner';
import Utils from '../../services/Utils';
import './Park.css';

// individual park pg. rendering from "More" button from home page or click from park link dash

class Park extends Component {
  static contextType = AppContext;

  static propTypes = {
    loading: PropTypes.bool,
  };

  // handles receipt of API data for park with lodash
  componentDidMount() {
    const { getPark } = this.context;
    getPark(get(this.props, 'match.params.parkCode', null));
  }

  // handles receipt of updated API data for park with lodash
  componentDidUpdate(prevProps) {
    const { getPark } = this.context;
    const code = get(this.props, 'match.params.parkCode', null);
    const previousCode = get(prevProps, 'match.params.parkCode', null);
    if (code && code !== previousCode) {
      getPark(code);
    }
  }

  // handles loading spinner when API data is being gathered.
  renderLoading = () => (
    <div>
      <h3>Retrieving Park Data...</h3>
      <Spinner />
    </div>
  )

  render() {
    const {
      addParkToList, refreshParkPage, currentWeather, hasAuth, showModalFunc,
    } = this.context;
    const park = get(this.props, 'park.data[0]');

    // show loading if data is still being fetched
    if (!park || this.props.loading) return this.renderLoading();

    // handling clean receipt of API data for populating this component
    const {
      activities,
      fullName: parkName,
      description,
      directionsInfo,
      parkCode,
      url,
    } = park;
    const city = get(park, 'addresses[0].city', 'No city available');
    const currentTemp = Utils.fromKelvin(currentWeather);
    const state = get(park, 'addresses[0].stateCode', 'No state available');
    const latLong = get(park, 'latLong', 'No lat/long coordinates available');
    const designation = get(park, 'designation', 'No designation available');
    const emailAddress = get(park, 'contacts.emailAddresses[0].emailAddress', 'No email address available');
    const entranceFee = get(park, 'entranceFees[0].title', 'No entrance fee information available');
    const imageUrl = get(park, 'images[0].url');
    const operatingHours = get(park, 'operatingHours[0].description', 'No operating hours available');
    const parkObject = { parkCode, parkName, parkCity: `${city}, ${state}` };
    const phoneNumber = Utils.formatPhoneNumber(get(park, 'contacts.phoneNumbers[0].phoneNumber'));

    return (
      <Fragment>
        <div id='park-page' className='park-page-header'>
          <div>
            <Link to='/' className='btn btn-light'>Back to Search</Link>
          </div>
          <div className="entrance-fee-container">
            <p className="entrance-fee-span">Entrance fee:</p>
            <p className="entrance-fee">{entranceFee}</p>
          </div>
        </div>
        <div className="className card grid-2">
          <div className="all-center">
            <img src={imageUrl} className="round-img" alt="" style={{ width: '150px', height: '150px' }} />
            <h1>{parkName}</h1>
            <p>
              Location:&nbsp;&nbsp;
              {city}
              ,
              &nbsp;
              {state}
            </p>
            <p>
              Current Temperature:&nbsp;&nbsp;
              {currentTemp}
            </p>
          </div>
          <div>
            {description && <Fragment>
              {
                refreshParkPage(parkCode) ? <p className="park-added">Park has been added to your list!</p> :
                  <button
                    className="btn btn-dark my-1"
                    onClick={hasAuth ? () => addParkToList(parkObject) : () => showModalFunc(true)}
                  >
                    <i className="fas fa-plus"></i> Add this park to my list
                  </button>
              }
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
                    <br />
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
          {designation && <div className="badge badge-light">{designation}</div>}
          <div className="badge badge-dark">{latLong}</div>
        </div>
        <Activities activities={activities} />
      </Fragment>
    )
  }
}

export default withAppContext(Park);
