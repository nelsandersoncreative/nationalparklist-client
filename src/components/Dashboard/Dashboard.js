import React, { useContext } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import Utils from '../../services/Utils';

import './Dashboard.css';

import AppContext, { withAppContext } from '../../contexts/AppContext';

// The user dashboard component when a user is logged in.  Displays salutation and user park list.
export const Dashboard = () => {
  const appContext = useContext(AppContext);
  const { userParkList, removeParkFromList, currentUser } = appContext;

  // When an onClick event occurs on a park name link in the user's  dashboard...change it's color
  function changeBackground(e) {
    e.target.style.background = 'white';
    e.target.style.color = 'blue';
  }

  // When onMouseLeave event occurs on a park name link in the user's
  // dashboard...change it's color back to the original
  function originalBackground(e) {
    e.target.style.background = 'blue';
    e.target.style.color = 'white';
  }

  return (
    <div className='user-dashboard'>
      <div className='dash-greeting'>
        {currentUser && (
          <div className='welcome-dash'>
            Welcome
            <span className='user-dash'>{currentUser.user_name}</span>
            !
          </div>
        )}
        <p className='parks-header-dash'>National Parks List:</p>
      </div>
      {userParkList && userParkList.length > 0
        ? (
          <div className='parks-grid'>
            {userParkList.map((park, index) => {
              const name = park.parkName;
              const city = park.parkCity;
              const code = `/park/${park.parkCode}`;
              return (
                <div className='park-grid-item' key={Utils.uuidv4()}>
                  <div>
                    <Link to={`${code}#park-page`} onClick={changeBackground} onMouseLeave={originalBackground} className='parkList-link'>{name}</Link>
                    <p className='parkcity'>{city}</p>
                  </div>
                  <button type='button' className='dash-delete' onClick={() => removeParkFromList(index, park.parkCode)}>Delete park</button>
                </div>
              );
            })}

          </div>
        )

        : <div><p className='park-placeholder'>No parks have been added to your list.</p></div>}
    </div>
  );
};

export default withAppContext(Dashboard);
