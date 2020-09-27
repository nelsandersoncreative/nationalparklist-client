import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.css';

import AppContext from '../../contexts/AppContext';
import { withAppContext } from '../../contexts/AppContext';

export const Dashboard = () => {

  const appContext = useContext(AppContext);
  const { userParkList, removeParkFromList, currentUser } = appContext;

  return (
      <div className="user-dashboard">
        <div className="dash-greeting">
        {currentUser && <div className="welcome-dash">Welcome <span className="user-dash">{currentUser.user_name}</span>!</div>}
        <p className="parks-header-dash">National Parks List:</p>
        </div>
        {userParkList && userParkList.length > 0 
        ? <div className="parks-grid">
          {userParkList.map((park, index) => {
            const name = park.parkName;
            const city = park.parkCity;
            const code = `/park/${park.parkCode}`;
            return (
              <div className="park-grid-item" key={index}>
                <div>
                  {<Link to={`${code}`} className="parkList-link">{name}</Link>}
                  <p className="parkcity">{city}</p>
                </div>
                <button className="dash-delete" onClick={() => removeParkFromList(index, park.parkCode)}>Delete park</button>
              </div>
            )
          })}
        </div>
        : <div><p className="park-placeholder">No parks have been added to your list.</p></div>
        }
      </div>
  )
}

export default withAppContext(Dashboard);
