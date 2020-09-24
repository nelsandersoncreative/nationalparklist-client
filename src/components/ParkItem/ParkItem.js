import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './ParkItem.css';
import placeholderImg from './placeholder.jpg';

import AppContext from '../../contexts/AppContext'
import { withAppContext } from '../../contexts/AppContext'

const ParkItem = ({ park }) => {

  const appContext = useContext(AppContext);
  const { hasAuth, addParkToList, showModalFunc } = appContext;

  const cityFormat = parkAddress => {
    if (parkAddress === undefined) {
      return 'no city available'
    } else {
    return parkAddress[0] ? parkAddress[0].city : 'no city available';
  }
  }

  const stateFormat = address => {
    if (address === undefined) {
      return 'no city available'
    } else {
      return address[0] ? address[0].stateCode : 'no state available';
    }
  }

  const image = park.images[0] ? park.images[0].url : placeholderImg;

  const name = park.fullName;
  const parkCode = park.parkCode;
  const city = cityFormat(park.addresses);
  const state = stateFormat(park.addresses);

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
            <button onClick={hasAuth ? () => addParkToList(parkObject) : () => showModalFunc(true)} className="btn btn-dark btn-sm my-1"><i className="fas fa-plus"></i>Add Park To List</button></div>
        </div>
    )
}

export default withAppContext(ParkItem);
