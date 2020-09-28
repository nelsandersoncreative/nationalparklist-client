import React, { Fragment } from 'react';
import ActivityItem from './ActivityItem';

//This component is the Activities container on each individual Park page
const Activities = ({ activities }) => (
  <Fragment>
    <h1 className="text-center">Activities:</h1>
    <div className="grid-4">
      { activities
        ? activities.map((activity, i) => <ActivityItem activity={activity} key={`activity-${i}`} id={activity.id} />)
        : <div className="card">
            <h3>
              <p>No activities listed for this location.</p>
            </h3>
          </div>
      }
    </div>
  </Fragment>
)

export default Activities;
