import React, { Component } from 'react'
import Notes from './notes/Notes'

export default class App extends Component {
  render() {
    return (
      <div className="container-fluid">
        <Notes />
      </div>
    )
  }
}

