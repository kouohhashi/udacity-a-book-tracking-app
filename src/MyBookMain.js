import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './App.css'

import BookShelf from './BookShelf'

// BooksApp Component
class MyBookMain extends Component {

  render() {
    return (

      <div className="list-books">

        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>

            <BookShelf
              moveBooktoNewShelf={this.props.moveBooktoNewShelf}
              header_text='Currently Reading'
              books={this.props.books.filter( (book) => book.shelf === "currentlyReading" )}
              />

            <BookShelf
              moveBooktoNewShelf={this.props.moveBooktoNewShelf}
              header_text='Want to Read'
              books={this.props.books.filter( (book) => book.shelf === "wantToRead" )}
              />

            <BookShelf
              moveBooktoNewShelf={this.props.moveBooktoNewShelf}
              header_text='Read'
              books={this.props.books.filter( (book) => book.shelf === "read" )}
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
