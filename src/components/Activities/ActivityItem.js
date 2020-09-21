import React from 'react';
// import PropTypes from 'prop-types';

const ActivityItem = ({ activity }) => {
    return (
      <div className="card">
        <h3>
          <p>{activity.name}</p> 
        </h3>
      </div>
    )  
}

// ActivityItem.propTypes = {
//   // activity: PropTypes.object.isRequired
// }

export default ActivityItem;
