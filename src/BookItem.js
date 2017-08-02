import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
// import { Route, Link } from 'react-router-dom'


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

    // backgroundImage: `url(${book.imageLinks.smallThumbnail})`
    var smallThumbnail = "no_image.png"
    if (book.imageLinks && book.imageLinks.smallThumbnail) {
      smallThumbnail = book.imageLinks.smallThumbnail
    }

    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={
              {
                width: 128,
                height: 193,
                backgroundImage: `url(${smallThumbnail})`
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

export default BookItem
