import React from 'react'
import './Button.css'

const Button = (props) =>
  <button
    type='button'
    onClick={props.onClick}
    name={props.name}
  >
    {props.name}
  </button>
export default Button
