import React, { NavLink } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunks } from '../store/books';
import ReviewForm from './ReviewForm';
import { Container, Card } from 'react-bootstrap';

const ViewBook = props => {
    const dispatch = useDispatch();
    const currentBookId = Number.parseInt(props.match.params.id);
    const currentBook = useSelector(state => state.books.currentBook);
    const currentReviews = useSelector(state => state.books.currentReviews);
    const token = useSelector(state => state.auth.token);
    const currentUserId = useSelector(state => state.auth.user.id);
    // console.log(currentBook.id, currentBookId);
    if(!currentBook || currentBook.id !== currentBookId){
        dispatch(thunks.retrieveBook(currentBookId));
        dispatch(thunks.retrieveReviews(currentBookId));
    }

    if (!currentBook) return <h1>Book not found</h1>;
    else {
        return (
            <Container>
                <div>
                    <h1>{currentBook.title}</h1>
                    <img src={currentBook.coverImageUrl} />
                    <h2>by {currentBook.authorFirstName} {currentBook.authorLastName}</h2>
                    <h2>published {currentBook.publicationYear}</h2>
                </div>
                {token ? <ReviewForm currentUserId={currentUserId} bookId={currentBookId} /> : <NavLink to="/users/login">Please log in to leave a review</NavLink>}
                <div>
                    {currentReviews.map(review => (
                        <Card key={review.id}>
                            <Card.Body>
                            <Card.Title>Review by <b>{review.User.username}</b> at {review.createdAt}</Card.Title>
                            <Card.Text>{review.content}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Container>
        )
    }
}

export default ViewBook;
