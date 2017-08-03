import React, { Component } from 'react'

// BookItem Component
class BookItem extends Component {

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

              <select value={book.shelf} onChange={(e) => {
                  var book = this.props.book;
                  book.shelf = e.target.value;
                  this.props.moveBooktoNewShelf(book)
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
