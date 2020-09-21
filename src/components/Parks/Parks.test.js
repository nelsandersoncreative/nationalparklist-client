import React from 'react';
import ReactDOM from 'react-dom';
import Parks from './Parks';

describe('Parks Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(< Parks />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
