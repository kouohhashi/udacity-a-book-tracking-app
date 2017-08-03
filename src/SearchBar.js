import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import {debounce} from 'throttle-debounce';
import shortid from 'shortid'

import BookItem from './BookItem'

/*
 * SearchBar Component
 */
class SearchBar extends Component {

  constructor() {
    super();
    // this.searchBooksDebounce = debounce(500, this.searchBooksDebounce);
    this.searchBookAPICallwithDebounce = debounce(300, this.searchBookAPICallwithDebounce);
  }

  state = {
    searchedBooks:[],
    query: ""
  }

  // search call with debounce
  searchBooks2 = (str) => {
    // set query string
    this.setState({query: str.trim()});
    const query = str.trim();
    this.setState({query: query});
    // console.log("query:"+query+", str:"+str)
    // == show warning ????
    if (query === "") {
      // clear list
      this.setState({
        searchedBooks:[]
      })
      return;
    }

    // call API
    this.searchBookAPICallwithDebounce(query)
  }

  searchBookAPICallwithDebounce = (query) => {
    // connect BooksAPI
    BooksAPI.search(query, 50).then((data) => {

      // reconsile shelf because shelf returned by search was wrong.
      let books = data.map( (book) => {
        let book_in_mybook = this.props.books.filter((myBooks) => myBooks.id === book.id && myBooks.title === book.title)
        if (book_in_mybook && book_in_mybook.length !== 0){
          return book_in_mybook[0];
        } else {
          return book;
        }
      } )
      this.setState({
        'searchedBooks':books
      })
    })
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
              onChange={(event) => this.searchBooks2(event.target.value)} />
          </div>

        </div>
        <div className="search-books-results">
          <ol className="books-grid">

          {this.state.searchedBooks && this.state.searchedBooks.length > 0 &&

            this.state.searchedBooks.map( (book) => (

              <BookItem key={shortid.generate()} book={book} moveBooktoNewShelf={this.props.moveBooktoNewShelf} />

            ) )
          }

          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBar
