import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import {debounce} from 'throttle-debounce';

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
    console.log("query:"+query+", str:"+str)
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

  // searchBooksDebounce = (str) => {
  //
  //   this.setState({query: str.trim()});
  //
  //   const query = this.state.query;
  //   // == show warning ????
  //   if (query === "") {
  //     // clear list
  //     this.setState({
  //       searchedBooks:[]
  //     })
  //     return;
  //   }
  //
  //   // connect BooksAPI
  //   BooksAPI.search(query, 50).then((data) => {
  //
  //     console.log("aaa:"+query)
  //     console.log(data)
  //
  //     this.setState({
  //       'searchedBooks':data
  //     })
  //   })
  // }

  searchBookAPICallwithDebounce = (query) => {
    // connect BooksAPI
    BooksAPI.search(query, 50).then((data) => {

      console.log("aaa:"+query)
      console.log(data)

      this.setState({
        'searchedBooks':data
      })
    })
  }

  // // search call
  // searchBooks = (str) => {
  //
  //   this.setState({query: str.trim()});
  //
  //   // because if send something every time user input something, it may be too much,
  //   // we send data only when user wait 1 sec after inputs
  //   if (this.myTimeout != null){
  //     clearTimeout(this.myTimeout)
  //   }
  //   this.myTimeout = setTimeout(() => {
  //
  //     const query = this.state.query;
  //     // == show warning ????
  //     if (query === "") {
  //       // clear list
  //       this.setState({
  //         searchedBooks:[]
  //       })
  //       return;
  //     }
  //
  //     // connect BooksAPI
  //     BooksAPI.search(query, 50).then((data) => {
  //
  //       console.log("aaa:"+query)
  //       console.log(data)
  //
  //       this.setState({
  //         'searchedBooks':data
  //       })
  //     })
  //   }, 500)
  // }

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

              <BookItem key={book.id} book={book} backToMain={this.props.backToMain}/>

            ) )
          }

          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBar
