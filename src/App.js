import React from 'react'
import { hot } from 'react-hot-loader/root'
import './App.css'
import Addtodo from './component/Addtodo'
import Todo from './component/Todo'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      todos: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({
      value: e.target.value
    })
  }

  handleSubmit (e) {
    const todo =
      {
        todo: this.state.value,
        isDone: false,
        key: new Date().toLocaleString()
      }
    const newTodos = [...this.state.todos, todo]
    e.preventDefault()
    this.setState({
      value: '',
      todos: newTodos
    })
  }

  render () {
    return (
      <div className='App'>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='addtodo'>Add todo:</label>
          <Addtodo
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
        <ol type='I' id='display'>
          {this.state.todos.map(x => <Todo todo={x} key={x.key} />)}
        </ol>
      </div>
    )
  }
}

export default hot(App)
