import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';

describe('Dashboard Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const currentUser = { user_name: "test user" };
    ReactDOM.render(< Dashboard currentUser={currentUser} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
