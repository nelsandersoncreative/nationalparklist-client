import React from 'react';
import '../App/App.css';
// import PropTypes from 'prop-types';

const ActivityItem = ({ activity }) => {
    return (
      <div className="card">
        <div>
          <p className="activity-name">{activity.name}</p> 
        </div>
      </div>
    )  
}

// ActivityItem.propTypes = {
//   // activity: PropTypes.object.isRequired
// }

export default ActivityItem;
