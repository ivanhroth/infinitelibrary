import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunks } from '../store/books';
import ReviewForm from './ReviewForm';

const ViewBook = props => {
    const dispatch = useDispatch();
    const currentBookId = Number.parseInt(props.match.params.id);
    const currentBook = useSelector(state => state.books.currentBook);
    // console.log(currentBook.id, currentBookId);
    if(!currentBook || currentBook.id !== currentBookId) dispatch(thunks.retrieveBook(currentBookId));

    if (!currentBook) return <h1>Book not found</h1>;
    else {
        return (
        <>
        <div>
            <h1>{currentBook.title}</h1>
            <h2>by {currentBook.authorFirstName} {currentBook.authorLastName}</h2>
            <h2>published {currentBook.publicationYear}</h2>
        </div>
        <ReviewForm />
        </>
        )
    }
}

export default ViewBook;
