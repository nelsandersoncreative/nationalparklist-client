import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Utils from '../../services/Utils';

import './ParkItem.css';
import placeholderImg from './placeholder.jpg';

import AppContext from '../../contexts/AppContext'
import { withAppContext } from '../../contexts/AppContext'

// this is the park item displayed on the home page in the search results
const ParkItem = ({ park }) => {

  const appContext = useContext(AppContext);
  const { hasAuth, userParkList, addParkToList, showModalFunc } = appContext;

  const image = park.images[0] ? park.images[0].url : placeholderImg;

  const name = park.fullName;
  const parkCode = park.parkCode;
  const city = Utils.cityFormat(park.addresses);
  const state = Utils.stateFormat(park.addresses);

  const parkObject = {
    parkCode: parkCode,
    parkName: name,
    parkCity: `${city}, ${state}` 
  }

    return (
        <div className="card text-center">
          <img src={image} alt="park" className="round-img" style={{ height: '60px', width: '60px' }}/>
          <h3 className="park-item-h3">{name}</h3>
          <div><Link to={`/park/${parkCode}`} className="btn btn-dark btn-sm my-1">More</Link></div>
          <div>
            {
              Utils.userParkSearch(parkCode, userParkList) === true ? <p className="park-added">Park has been added to your list!</p> : 
              <button onClick={hasAuth ? () => addParkToList(parkObject) : () => showModalFunc(true)} className="btn btn-dark btn-sm my-1"><i className="fas fa-plus"></i>Add Park To List</button>
            }
          </div>
        </div>
    )
}

export default withAppContext(ParkItem);
