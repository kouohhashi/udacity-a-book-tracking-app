import React, { Component } from 'react'
import BookItem from './BookItem'

/*
 * My book list
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

export default BookShelf
