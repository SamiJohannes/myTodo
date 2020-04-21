import React from 'react'
import './Addtodo.css'

const Addtodo = (props) =>
  <input id='addtodo' placeholder='type here' type='text' value={props.value} onChange={props.onChange} />

export default Addtodo
