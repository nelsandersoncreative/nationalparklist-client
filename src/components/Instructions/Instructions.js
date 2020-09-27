import React from 'react'
import menuArrowUp from './menuArrowUp.png';
import '../App/App.css';

const Instructions = () => {
  return (
    <div>
      <h1>How to Create Your National Park List:</h1>
      <p className="landing-text first">1. Make a search for a national park based on anything.  Seach by State, activities, weather, city, lat/long coordinates, etc.</p>
      <p className="landing-text">2. The app will provide information for United States National Parks relating to your search.</p>
      <p className="landing-text">3. On search results, click "more" to learn more about a given park.</p>
      <p className="landing-text">4. click "Add Park To List" to add a park to your list</p>
    </div>
  )
}

export default Instructions;