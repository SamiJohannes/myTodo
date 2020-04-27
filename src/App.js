import React from 'react'
import { hot } from 'react-hot-loader/root'
import './App.css'
import Addtodo from './component/Addtodo'
import Todo from './component/Todo'
import ActionBar from './component/ActionBar'
import Button from './component/Button'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      todos: [],
      display: 'all'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange (e) {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    // after input submit, value is added to todos array in state object
    this.setState({
      value: '',
      todos: [
        ...this.state.todos,
        {
          todo: this.state.value,
          isDone: false,
          key: new Date().toLocaleString()
        }
      ]
    })
  }

  handleClick (e, index) {
    if (e.target.name === 'done') {
      const updateTodos = this.state.todos.map((x, i) => {
        if (i === index) {
          return {
            todo: x.todo,
            isDone: !x.isDone,
            key: x.key
          }
        } else {
          return x
        }
      })
      e.target.blur()
      this.setState({
        todos: updateTodos
      })
    }
    // handles filter button click event
    if (e.target.name === 'all' || e.target.name === 'complete' || e.target.name === 'active') {
      e.target.name === 'all'
        ? this.setState({ display: 'active' })
        : e.target.name === 'active'
          ? this.setState({ display: 'complete' })
          : this.setState({ display: 'all' })
    }
  }

  render () {
    // keeps track the amount of active todos
    const count = this.state.todos.reduce((count, todo) => {
      if (!todo.isDone) {
        return ++count
      } else {
        return count
      }
    }, 0)
    // todo template, iterate state todos
    const displayTodo = this.state.todos.map((x, index) =>
      <Todo
        todo={x}
        onFocus={this.handleFocus}
        key={x.key}
        onClick={(e) => this.handleClick(e, index)}
      />
    )
    return (
      <div className='App'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='addtodo'>Add todo:</label>
          <Addtodo
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
        <ActionBar count={count}>
          {'Filter todos: '}<Button name={this.state.display} onClick={this.handleClick} />
        </ActionBar>
        <ol type='I' id='display'>
          {/* filters todos according user selection */}
          {this.state.display === 'all'
            ? displayTodo
            : this.state.display === 'active'
              ? displayTodo.filter(x => x.props.todo.isDone === false)
              : displayTodo.filter(x => x.props.todo.isDone === true)}
        </ol>
      </div>
    )
  }
}

export default hot(App)
