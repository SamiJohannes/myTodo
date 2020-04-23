import React from 'react'
import './Todo.css'
import ActionModal from './ActionModal.js'

const Todo = (props) =>
  <li tabIndex={0}>
    <ActionModal data={props.todo} onClick={props.onClick} />
    <p
      className={props.todo.isDone ? 'todoDone' : null}
    >{props.todo.todo}
    </p>
  </li>

export default Todo
