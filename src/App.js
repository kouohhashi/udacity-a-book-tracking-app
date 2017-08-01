import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'

import './App.css'

/*
 * SearchBar Component
 */
class SearchBar extends Component {

  state = {
    query: ""
  }

  searchBooks = (str) => {

    this.setState({query: str.trim()});

    // because if send something every time user input something, it may be too much,
    // we send data only when user wait 1 sec after inputs
    if (this.myTimeout != null){
      clearTimeout(this.myTimeout)
    }
    this.myTimeout = setTimeout(() => {

      const query = this.state.query;
      // == show warning ????
      if (query === "") {
        return;
      }

      // connect BooksAPI
      BooksAPI.search(query, 50).then((data) => {
        this.setState({
          'searchedBooks':data
        })
      })
    }, 1000)
  }

  render(){

    const { query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">

          <Link
            to="/"
            className='close-search'>
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.searchBooks(event.target.value)} />
          </div>

        </div>
        <div className="search-books-results">
          <ol className="books-grid">

          {this.state.searchedBooks && this.state.searchedBooks.length > 0 &&

            this.state.searchedBooks.map( (book) => (

              <BookItem key={book.id} book={book} backToMain={this.props.backToMain}/>

            ) )
          }

          </ol>
        </div>
      </div>
    )
  }
}


// BookItem Component
class BookItem extends Component {

  handleChange = (shelf) => {
    // update shelf
    BooksAPI.update(this.props.book, shelf).then((data) => {
      // go back to main
      this.props.backToMain();
    })
  }

  render(){

    const { book } = this.props;

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={
              {
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks.smallThumbnail})`
              }
            }></div>
            <div className="book-shelf-changer">

              <select value={this.props.book.shelf} onChange={(event) => {
                this.handleChange(event.target.value)
                // go back to main
                // this.props.backToMain()
                // this.props.updateBookStatus(this.props.book, event.target.value)
              }} >

              }>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors} poo</div>
        </div>
      </li>
    )
  }
}

/*
 * My List Component
 */
class BookShelf extends Component {

  render(){
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.header_text}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {this.props.books.map( (book) => (
              <BookItem
                key={book.id}
                book={book}
                backToMain={this.props.backToMain}
                />
            ) )}

          </ol>
        </div>
      </div>
    )
  }
}

// BooksApp Component
class BooksApp extends React.Component {

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
