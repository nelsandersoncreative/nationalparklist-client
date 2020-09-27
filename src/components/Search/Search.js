import React, { Component } from 'react';
import AppContext from '../../contexts/AppContext';
import { withAppContext } from '../../contexts/AppContext';

class Search extends Component {
  static contextType = AppContext;

  state = {
    text: ''
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

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
