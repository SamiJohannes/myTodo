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
          key: new Date().toLocaleString(),
          allDone: false
        }
      ]
    })
  }

  handleClick (e, index) {
    // handles todo actions, 1. matches selected todo with todos list 2. changes data according user input
    if (e.target.name === 'done' || e.target.name === 'del') {
      const updateTodos = this.state.todos.map((x, i) => {
        // mark selected todo as done
        if (i === index && e.target.name === 'done') {
          return {
            todo: x.todo,
            isDone: !x.isDone,
            key: x.key
          }
          // delete selected todo
        } else if (i === index && e.target.name === 'del') {
          return null
        } else {
          return x
        }
        // filter null value off the array
      }).filter(x => x)
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
    // handle delete all
    if (e.target.name === 'delete all done') {
      const filterTodos = this.state.todos.filter(x => !x.isDone)
      this.setState({ todos: filterTodos })
    }
    // handle toggle all
    if (e.target.name === 'All Done') {
      const alldone = this.state.todos.map(x => {
        if (this.state.allDone) {
          return {
            todo: x.todo,
            isDone: false,
            key: x.key
          }
        } else {
          return {
            todo: x.todo,
            isDone: true,
            key: x.key
          }
        }
      })
      this.setState({ todos: alldone, allDone: !this.state.allDone })
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
    // checks if any todo is done
    const todosDone = this.state.todos.filter(x => x.isDone)
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
          {/* display delete all done button, if any there is any completed todos */}
          {todosDone.length ? <Button name='delete all done' onClick={this.handleClick} /> : null}
          <Button name='All Done' onClick={this.handleClick} />
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
