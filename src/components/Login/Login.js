import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-service';
import AppContext from '../../contexts/AppContext';
import { withAppContext } from '../../contexts/AppContext';

import './Login.css';
import ErrorImage from './error.svg';


class Login extends Component {

  static contextType = AppContext;
  
  state = {
    error: null,
    email: '',
    password: ''
  }

  handleSubmit = async (e) => {
    
    e.preventDefault();
    this.setState({ error: null })
    const { setLoading, login, setCurrentUser, getUserParks } = this.props.appContext
    
    try {
      setLoading(true)
      const {email, password} = this.state;
      const savedUser = await AuthApiService.login(email, password)
      login(savedUser.authToken)
      setCurrentUser(savedUser.user);
      getUserParks(savedUser.user.id)
      setLoading(false)
    } catch(err) {
      this.setState({ error: err.message }, setLoading(false))
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    })
  }

  render() {
    const { email, password, error } = this.state
    const { hideLoginFunc, showModalFunc } = this.context
    return (
      <div className="login-container" id="login">
        <div className="login">
          <button className="close-btn" id="close" onClick={hideLoginFunc}>
            <i className="fa fa-times"></i>
          </button>
          <div className="login-header">
            <h3>Login</h3>
            <p>Don't have an account? <Link to='/' className="nav-link" onClick={showModalFunc}>Create an account</Link></p>
          </div>
          <div className="login-content">
              <p>Login to see your curated list of parks!</p>
              <form className='js-login-form' action='#' onSubmit={(e) => this.handleSubmit(e)}>
              <div className='error-msg'>{error ? <img id="error-img" src={ErrorImage} alt="error" /> : null}{error}</div>
                <div className='form-group'>
                  <label htmlFor='email'>Email</label>
                  <input id='email' name='email' type='text' value={email} onChange={this.handleChange}  autoComplete="on"/>
                </div>

                <div className='form-group'>
                  <label htmlFor='password'>Password</label>
                  <input id='password' name='password' type='password' value={password} onChange={this.handleChange} autoComplete="on"/>
                </div>
                <div className='form-controls'>
                  <button className='button full outline' type='submit'>Login</button>
                </div>
              </form>
          </div>
        </div>
      </div>
)
}
}

export default withAppContext(Login);