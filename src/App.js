import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import './App.css'

import NoMatch from './NoMatch'
import SearchBar from './SearchBar'
import MyBookMain from './MyBookMain'

// BooksApp Component
class BooksApp extends Component {

  render() {
    return (
      <div className="app">

        <Switch>

          <Route path='/search' render={({history}) => (
            <SearchBar backToMain={() => {
              history.push('/')
            }} />
          )} />

          <Route exact path='/' render={({history}) => (
            <MyBookMain />
          )} />

          <Route component={NoMatch} />

        </Switch>

      </div>
    )
  }
}

export default BooksApp
