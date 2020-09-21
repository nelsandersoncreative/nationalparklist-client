import React from 'react';
import ReactDOM from 'react-dom';
import ActivityItem from './ActivityItem';

describe('ActivityItem Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const activity= "dummy activity";
    ReactDOM.render(< ActivityItem activity={activity} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
