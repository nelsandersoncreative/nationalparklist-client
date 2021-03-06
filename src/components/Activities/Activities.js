import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Utils from '../../services/Utils';
import ActivityItem from './ActivityItem';

//  This component is the Activities container on each individual Park page
const Activities = ({ activities }) => (
  <Fragment>
    <h1 className='text-center'>Activities:</h1>
    <div className='grid-4'>
      {activities ? activities.map((activity) => <ActivityItem activity={activity} key={`activity-${Utils.uuidv4()}`} id={activity.id} />)
        : (
          <div className='card'>
            <h3>
              <p>No activities listed for this location.</p>
            </h3>
          </div>
        )}
    </div>
  </Fragment>
);

export default Activities;

Activities.propTypes = {
  activities: PropTypes.array.isRequired,
};
