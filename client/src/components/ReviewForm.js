import React, { useState} from 'react';
import { thunks } from '../store/books';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';


const ReviewForm = props => {

    const dispatch = useDispatch();

    const [reviewContent, setReviewContent] = useState("");
    const token = useSelector(state => state.auth.token);
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const payloadObj = JSON.parse(decodedPayload);
    const currentEmail = payloadObj.data.email;

    const postReview = e => {
        e.preventDefault();
        console.log(`posting review - content: "${reviewContent}", email: ${currentEmail}, book ID: ${props.bookId}`);
        dispatch(thunks.postReview(reviewContent, currentEmail, props.bookId)) // two more parameters: userId and bookId
    }

    const updateReviewContent = e => {
        setReviewContent(e.target.value);
    }

    return (
        <div>
            <Form onSubmit={postReview}>
                <div><textarea onChange={updateReviewContent}></textarea></div>
                <div><Button type="submit">Post a review</Button></div>
            </Form>
        </div>
    )
}

export default ReviewForm;
