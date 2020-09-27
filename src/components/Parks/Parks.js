import React, { Fragment, useContext } from 'react';

import Spinner from '../Spinner/Spinner';
import ParkItem from '../ParkItem/ParkItem';

import AppContext from '../../contexts/AppContext'
import { withAppContext } from '../../contexts/AppContext'

const Parks = ({ parks }) => {
  const appContext = useContext(AppContext);
  const { addParkToList, isLoading } = appContext;
  
    if (!parks && !isLoading) {
      return <div><h2>Submit a search above to see national parks.</h2></div>
    }
    if (!parks && isLoading) {
      return (
        <Fragment>
          <h1 style={{ width: "400px", margin: "auto", display: "block" }}>Retrieving National Parks Information!</h1>
          <Spinner />
        </Fragment>
      )
   } else {
      return parks.length === 0
        ? <h1>No Parks Found.</h1>
        : <div className="grid-3">
            {parks.map(park => (
              <ParkItem addParkToList={addParkToList} key={park.id} park={park}/>
            ))}
          </div>
    }
}

export default withAppContext(Parks);
