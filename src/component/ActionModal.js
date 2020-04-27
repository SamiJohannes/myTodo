import React from 'react'
import './ActionModal.css'
import Button from './Button'

const ActionModal = (props) =>
  <div id={props.data.todo} className='modal'>
    <Button data={props.data} name='done' onClick={props.onClick} />
    <Button data={props.data} name='del' onClick={props.onClick} />
  </div>
export default ActionModal
