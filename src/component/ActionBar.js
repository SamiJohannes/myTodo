import React from 'react'
import './ActionBar.css'

const ActionBar = (props) =>
  <div>
    {'Active todos: '}{props.count}
  </div>
export default ActionBar
