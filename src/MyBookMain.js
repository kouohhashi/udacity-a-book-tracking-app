import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'

import './App.css'

import BookShelf from './BookShelf'

// BooksApp Component
class MyBookMain extends Component {

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

      <div className="list-books">

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>

            <BookShelf
              moveBooktoNewShelf={this.refreshMyBooks}
              header_text='Currently Reading'
              books={this.state.books.filter( (book) => book.shelf === "currentlyReading" )}
              />

            <BookShelf
              moveBooktoNewShelf={this.refreshMyBooks}
              header_text='Want to Read'
              books={this.state.books.filter( (book) => book.shelf === "wantToRead" )}
              />

            <BookShelf
              moveBooktoNewShelf={this.refreshMyBooks}
              header_text='Read'
              books={this.state.books.filter( (book) => book.shelf === "read" )}
              />

          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MyBookMain
