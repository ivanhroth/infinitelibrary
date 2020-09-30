import React from 'react';

import { useDispatch } from 'react-redux';

const ViewBook = props => {
    const currentBookId = props.id;
    const currentBook = null;
    if (!currentBook) return <h1>Book not found</h1>;
    return (
        <div>

        </div>
    )
}

export default ViewBook;
