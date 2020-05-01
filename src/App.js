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
      display: 'all',
      allDone: true
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleAllDone = this.handleAllDone.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
  }

  handleChange (e) {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    // after input submit, value is added to todos array in state object
    this.setState(state => ({
      value: '',
      todos: [
        ...state.todos,
        {
          todo: state.value,
          isDone: false,
          key: new Date().toLocaleString()
        }
      ]
    }))
  }

  handleClick (e, index) {
    // handles todo actions, 1. marks selected todo as done
    if (e.target.name === 'done') {
      this.setState(state => ({
        todos: state.todos.map((todo, i) => {
          if (i === index) {
            return { ...todo, isDone: !todo.isDone }
          } else {
            return todo
          }
        })
      }))
      e.target.blur()
    }
    // 2. deletes selected todo
    if (e.target.name === 'del') {
      this.setState(state => ({
        todos: state.todos.filter((todo, i) => i !== index)
      }))
    }
  }

  // displays filtered todos, all/active/completed
  handleFilter (e) {
    e.target.name === 'all'
      ? this.setState({ display: 'active' })
      : e.target.name === 'active'
        ? this.setState({ display: 'complete' })
        : this.setState({ display: 'all' })
  }

  // handles toggle all todos done/undone
  handleAllDone () {
    this.setState(state => ({
      todos: state.todos.map(todo => ({ ...todo, isDone: state.allDone })),
      allDone: !state.allDone
    }))
  }

  render () {
    // todo template, iterate state todos
    const displayTodo = this.state.todos.map((x, index) =>
      <Todo
        todo={x}
        key={x.key}
        onClick={(e) => this.handleClick(e, index)}
      />
    )
    return (
      <div className='App'>
        {/* input field for user to add todos */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='addtodo'>Add todo: </label>
          <Addtodo
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
        {/* container component for general actions and active todo counter */}
        <ActionBar count={this.state.todos.filter(todo => !todo.isDone).length}>
          <h2>Filter todos: <Button name={this.state.display} onClick={this.handleFilter} /></h2>
          {/* mark all todos to done/undone */}
          <Button name='All Done' onClick={this.handleAllDone} />
          {/* display delete all done button, if any there is any completed todos */}
          {this.state.todos.some(todo => todo.isDone) // removes all completed todos
            ? <Button name='delete all done' onClick={() => this.setState(state => ({ todos: state.todos.filter(x => !x.isDone) }))} />
            : null}
        </ActionBar>
        {/* display container for users todos */}
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
