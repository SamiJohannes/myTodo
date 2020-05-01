import React from 'react'
import './ActionBar.css'

const ActionBar = (props) =>
  <div className='actionBar'>
    <h2>Active todos: {props.count}</h2>{props.children}
  </div>
export default ActionBar
