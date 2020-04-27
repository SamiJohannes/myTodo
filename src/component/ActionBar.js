import React from 'react'
import './ActionBar.css'

const ActionBar = (props) =>
  <div>
    {'Active todos: '}{props.count}{props.children}
  </div>
export default ActionBar
