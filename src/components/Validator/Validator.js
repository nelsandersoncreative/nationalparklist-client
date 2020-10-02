import React from 'react';
import './Validator.css';
import ErrorImage from '../Signup/error.svg';

export default function Validator(props) {
  if (!props.isValid) {
    return (
      <div className='form-validation-error'>
        {props.msg ? <img id='error-img' src={ErrorImage} alt='error' /> : null}
        {props.msg}
      </div>
    );
  }
  return null;
}
