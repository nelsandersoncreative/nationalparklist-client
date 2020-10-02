import React from 'react';
import '../App/App.css';

// Individual component for each activity rendered within the Activity container on a Park page.
const ActivityItem = ({ activity }) => {
  return (
    <div className='card'>
      <div>
        <p className='activity-name'>{activity.name}</p>
      </div>
    </div>
  );
};

export default ActivityItem;
