import React from 'react';
import ReactDOM from 'react-dom';
import Instructions from './Instructions';

describe('Instructions Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(< Instructions />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
