import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ErrorImage from './error.svg';
import Validator from '../Validator/Validator';
import AuthApiService from '../../services/auth-api-service'
import AppContext from '../../contexts/AppContext';
import { withAppContext } from '../../contexts/AppContext';
import './Signup.css';

class Signup extends Component {
  
  static contextType = AppContext;

  state = {
    user_name: '', user_name_valid: false,
    email: '', emailValid: false,
    password: '', passwordValid: false,
    newUser: '',
    formValid: false,
    error: null,
    validationError: {}
  }

  componentWillUnmount() {
    this.setState({error: null})
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({error: null})
    const { user_name, email: user_email, password: user_password } = this.state
    const { setLoading, login, setCurrentUser, hideModalFunc } = this.context;
    const newUser = {
      user_name, 
      user_email, 
      user_password
    }

    try {
      setLoading(true)
      const inputNewUser = await AuthApiService.createUser(newUser)
      this.setState({ newUser: inputNewUser });
      const savedUser = await AuthApiService.login(user_email, user_password)
      login(savedUser.authToken);
      setCurrentUser(savedUser.user);
      hideModalFunc();
    } catch(err) {
      this.setState({ error: err.message }, setLoading(false))
    }
    setLoading(false)
  }

  handleChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value
    }, name === 'password' ? this.validateUserPassword : null)
  }

  validateForm = () => {
    const {user_name_valid, emailValid, passwordValid} = this.state
    this.setState({
      formValid: user_name_valid && emailValid && passwordValid
    })
  }

  validateUserName = () => {
    let user_name_valid = true;
    const validationError = {...this.state.validationError}
    const {user_name} = this.state

    if (user_name.startsWith(' ') || user_name.endsWith(' ')) {
      user_name_valid = false
      validationError.user_name = 'Sorry, your username cannot begin or end with a space.'
    } else if (user_name.length < 3 || user_name.length > 30) {
      user_name_valid = false
      validationError.user_name = 'Sorry, your username must be between 3 and 30 characters.'
    } 

    this.setState({user_name_valid, validationError}, this.validateForm)
  }

  validateUserEmail = () => {
    let emailValid = true
    const validationError = {...this.state.validationError}
    const {email} = this.state

    if (email.startsWith(' ') || email.endsWith(' ')) {
      emailValid = false
      validationError.email = 'Sorry, your email cannot begin or end with a space'
    } else if (!email.length) {
      emailValid = false
      validationError.email = 'Enter an email.'
    } else if (!/\S+@\S+/.test(email)) {
      emailValid = false
      validationError.email = 'Enter a valid email.'
    }

    this.setState({emailValid, validationError}, this.validateForm)
  }

  validateUserPassword = () => {
    let passwordValid = true
    const validationError = {...this.state.validationError}
    const {password} = this.state

    if (password.startsWith(' ') || password.endsWith(' ')) {
      passwordValid = false
      validationError.password = 'Sorry, your password cannot begin or end with a space.'
    } else if (password.length < 6 || password.length > 30) {
      passwordValid = false
      validationError.password = 'Sorry, your password must be between 6 and 30 characters.'
    }

    this.setState({passwordValid, validationError}, this.validateForm)
  } 

render() {
  const { error, user_name, email, password, validationError, user_name_valid, emailValid, passwordValid, formValid } = this.state;
  const { hideModalFunc, showLoginFunc } = this.context;

  return (
    <div className="modal-container" id="modal">
      <div className="modal">
        <button className="close-btn" id="close" onClick={hideModalFunc}>
          <i className="fa fa-times"></i>
        </button>
        <div className="modal-header">
          <h3>Sign Up</h3>
          <div className="to-login-container">
            <p className="to-login-paragraph-1">Already have an account?</p>
            <p className="to-login-paragraph-2"><Link to='/' className="nav-link" onClick={showLoginFunc}>Log in</Link></p>
          </div>
        </div>
        <div className="modal-content">
            <p>Create an account to store your own curated list of parks!</p>
            <form className='js-registration-form' action='#' onSubmit={this.handleSubmit}>
            <div className='error-msg'>{error ? <img id="error-img" src={ErrorImage} alt="error" /> : null}{error}</div>

            <div className='form-group'>
              <label htmlFor='user_name'>Username</label>
              <input type='text' id='user_name' name='user_name' value={user_name} onChange={this.handleChange} onBlur={this.validateUserName} autoComplete="on"/>
              <Validator isValid={user_name_valid} msg={validationError.user_name} />
            </div>

            <div className='form-group'>
              <label htmlFor='email'>Email</label>
              <input type='text' id='email' name='email' value={email} onChange={this.handleChange} onBlur={this.validateUserEmail}  autoComplete="on"/>
              <Validator isValid={emailValid} msg={validationError.email} />
            </div>

            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input type='password' id='password' name='password' value={password} onChange={this.handleChange} autoComplete="on"/>
              <Validator isValid={passwordValid} msg={validationError.password} />
            </div>

            <div className='form-controls'>
              <button disabled={!formValid} type='submit' className='button full outline'>Create Account</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
}

export default withAppContext(Signup);
