import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

// BookItem Component
class BookItem extends Component {

  state = {
    shelf: this.props.book.shelf
  }

  handleChange = (shelf) => {
    
    // update shelf
    BooksAPI.update(this.props.book, shelf).then((data) => {

      // update state of the book
      this.setState({
        shelf:shelf
      })

      // tell the change to parent
      this.props.moveBooktoNewShelf();
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
                backgroundImage: `url(${smallThumbnail})`
              }
            }></div>
            <div className="book-shelf-changer">

              <select value={this.state.shelf} onChange={(event) => {
                this.handleChange(event.target.value)
              }} >

              }>
                <option value="none1" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
        </div>
      </li>
    )
  }
}

export default BookItem
