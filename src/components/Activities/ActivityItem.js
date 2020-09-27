import React from 'react';
import '../App/App.css';

const ActivityItem = ({ activity }) => {
    return (
      <div className="card">
        <div>
          <p className="activity-name">{activity.name}</p> 
        </div>
      </div>
    )  
}

export default ActivityItem;
