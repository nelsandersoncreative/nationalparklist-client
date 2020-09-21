import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Activities from './Activities';

describe('Activities Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const park={ activities: [{id: 'dummy'}] };
    ReactDOM.render(< Activities park={park} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
