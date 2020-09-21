import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Park from './Park';

describe('Park Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    const park = {data: [
      { 
        activities: ["test activity"],
        addresses: "test addresses", 
        images: "test images", 
        fullName: "test fullName", 
        entranceFees: ["test data"], 
        contacts: {
          phoneNumbers: 1111111111,
          emailAddresses: ["test@test.com"]
        } }]} 
    ReactDOM.render(<BrowserRouter>< Park park={park} /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})
