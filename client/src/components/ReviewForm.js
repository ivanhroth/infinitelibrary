import React from 'react';
import { thunks } from '../store/books';

import { Button } from 'react-bootstrap';

const postReview = e => null;

const ReviewForm = props => {
    return (
        <div>
            <form onSubmit={postReview}>
                <div><textarea></textarea></div>
                <div><Button type="submit">Post a review</Button></div>
            </form>
        </div>
    )
}

export default ReviewForm;
