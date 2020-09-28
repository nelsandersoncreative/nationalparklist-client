import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import { withAppContext } from '../../contexts/AppContext';

// The search bar component found on the home page
class Search extends Component {
  static contextType = AppContext;

  state = {
    text: ''
  }

  // handles inputs into the search bar on the home page.
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // handles query submission for the search bar on the home page
  onSubmit = (e) => {
    e.preventDefault();
    this.context.clearParks();
    this.context.searchParks(this.state.text);
    this.setState({ text: '', isLoading: true });
    
  }
  
  render() {
    const { showClear } = this.props;
    const { clearParks } = this.context
    return (
      <div>
      <form className="form" onSubmit={this.onSubmit}>
        <input 
          type="text" 
          name="text" 
          placeholder="Search parks ..." 
          value={this.state.text} 
          onChange={this.onChange}
          autoComplete="on"/>
        <input type="submit" value="Search" className="btn btn-dark btn-block" />
      </form>
      {showClear && <button 
        className="btn btn-light btn-block"
        onClick={clearParks}
        >Clear</button>}
      </div>
    )
  }
}

export default withAppContext(Search);
