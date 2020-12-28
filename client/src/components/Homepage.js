import React from 'react';
import {Container} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom';
import { thunks } from '../store/books';

const Homepage = () => {

   const recentBooks = useSelector(state => state.books.recentBooks);

   const dispatch = useDispatch();

   if (recentBooks.length === 0) dispatch(thunks.retrieveRecentBooks());

   const recentBooksComponent = recentBooks.map(book => (
      <NavLink to={`/books/${book.id}`} key={book.id}>
      {book.coverImageUrl ? <img src={book.coverImageUrl} /> : <span><b><i>{book.title}</i></b> by {book.authorLastName}, {book.authorFirstName} ({book.publicationYear})</span>}
      </NavLink>
   ))

   return (
      <>
      <Container>
         <h2>Recently added books:</h2>
         <div className="recent-books">
            <ul>
            {recentBooksComponent}
            </ul>
         </div>
      </Container>
      </>
   )
}

export default Homepage;
