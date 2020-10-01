import React from 'react';
import { thunks } from '../store/books';

const postReview = e => null;

const ReviewForm = props => {
    return (
        <div>
            <form onSubmit={postReview}>
                <div><textarea></textarea></div>
                <div><button type="submit">Post a review</button></div>
            </form>
        </div>
    )
}

export default ReviewForm;
