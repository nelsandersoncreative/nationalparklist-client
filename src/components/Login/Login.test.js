import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>< Login /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
