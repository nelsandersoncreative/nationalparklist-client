import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Signup from './Signup';

describe.only('Signup Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>< Signup /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
