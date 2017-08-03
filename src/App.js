import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import './App.css'

import NoMatch from './NoMatch'
import SearchBar from './SearchBar'
import MyBookMain from './MyBookMain'

// BooksApp Component
class BooksApp extends Component {

  state = {
    books: []
  }

  // get book data: "currentlyReading", "wantToRead" "read"
  componentDidMount(){
    this.refreshMyBooks()
  }

  // refresh book list
  refreshMyBooks = () => {
    BooksAPI.getAll().then((data) => {

      // update states
      this.setState({
        'books':data
      })
    })
  }

  moveBooktoNewShelf = (book) => {
    // update shelf
    BooksAPI.update(book, book.shelf).then((data) => {
      this.refreshMyBooks()
    })
  }
  render() {
    return (
      <div className="app">

        <Switch>

          <Route path='/search' render={() => (
            <SearchBar books={this.state.books} moveBooktoNewShelf={this.moveBooktoNewShelf} />
          )} />

          <Route exact path='/' render={() => (
            <MyBookMain books={this.state.books} moveBooktoNewShelf={this.moveBooktoNewShelf} />
          )} />

          <Route component={NoMatch} />

        </Switch>

      </div>
    )
  }
}

export default BooksApp
