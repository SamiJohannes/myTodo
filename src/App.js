import React from 'react'
import { hot } from 'react-hot-loader/root'
import './App.css'
import Addtodo from './component/Addtodo'

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
        <h1> Hello, World! </h1>
        <form onSubmit={this.handleSubmit}>
          <Addtodo
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}

export default hot(App)
