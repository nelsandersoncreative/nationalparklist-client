import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ParkItem from './ParkItem';

describe('ParkItem Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>< ParkItem park={{ images: "test images" }} /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
