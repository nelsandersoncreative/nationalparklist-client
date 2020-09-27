import React from 'react';
import './About.css';

const About = () => {
  return (
    <div>
      <h1>About this app</h1>
      <br/>
      <br/>
      <h2 className="about-h2">What is this app used for?</h2>
      <p className="about-text">This app is a resource to find national parks in the United States based on search terms.</p>  
      <br/>
      <br/>
      <h2 className="about-h2">What can users do with this app?</h2>
      <p className="about-text">Users are able to curate, save and maintain a list of National Parks as well as learn more about each park including activities, current temperature, photos, contact information and much more.</p>  
      <br/>
      <br/>
      <h2 className="about-h2">Does this app use any third-party APIs?</h2>
      <div className="about-subtext">
      <p className="about-text">This app utilizes two third-party APIs:</p>
      <div className="api-cont"><p className="about-apis">The National Park Service's API:</p><a href="https://www.nps.gov/subjects/developer/api-documentation.htm" target="_blank" rel="noopener noreferrer">Click Here to Learn More about the National Parks Service API</a> <br /></div>
      <div className="api-cont"><p className="about-apis">The Open Weather API:</p><a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">Click Here to Learn More about the OpenWeather API</a></div></div>
      <br/>
      <br/>
      <h2 className="about-h2">This App's Latest Version:</h2>
      <p className="about-text">Version 1.0.0</p>
      <br/>
      <br/>
    </div>
  )
}

export default About;
