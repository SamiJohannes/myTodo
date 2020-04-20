import React from 'react'
import './Addtodo.css'

const Addtodo = (props) =>
  <input value={props.value} onChange={props.onChange} />

export default Addtodo
