import React from 'react'
import './Addtodo.css'

const Addtodo = (props) =>
  <input id='addtodo' placeholder='type here' size='50' maxLength='255' type='text' value={props.value} onChange={props.onChange} />

export default Addtodo
