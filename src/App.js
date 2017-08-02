import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'

import './App.css'

// import BookItem from './BookItem'
import SearchBar from './SearchBar'
import BookShelf from './BookShelf'


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

  render() {
    return (
      <div className="app">

        <Route path='/search' render={({history}) => (
          <SearchBar backToMain={() => {
            history.push('/')
            this.refreshMyBooks()
          }} />
        )} />

        <Route exact path='/' render={() => (

          <div className="list-books">

            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
              <div>

                <BookShelf
                  backToMain={this.refreshMyBooks}
                  header_text='Currently Reading'
                  books={this.state.books.filter( (book) => book.shelf === "currentlyReading" )}
                  />

                <BookShelf
                  backToMain={this.refreshMyBooks}
                  header_text='Want to Read'
                  books={this.state.books.filter( (book) => book.shelf === "wantToRead" )}
                  />

                <BookShelf
                  backToMain={this.refreshMyBooks}
                  header_text='Read'
                  books={this.state.books.filter( (book) => book.shelf === "read" )}
                  />

              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>

        )} />

      </div>
    )
  }
}

export default BooksApp
