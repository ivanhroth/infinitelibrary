import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const AddBookForm = () => {

    const [title, setTitle] = useState('');
    const [authorFirstName, setAuthorFirstName] = useState('');
    const [authorLastName, setAuthorLastName] = useState('');
    const [publicationYear, setPublicationYear] = useState('');

    const dispatch = useDispatch();

    const internalFind = async book => {
        const exactFindResult = await fetch('/api/books/find', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(book)
        });
        if(exactFindResult) return exactFindResult;
        else {
            return false;
        }
    }

    const submitBook = () => {
        const newBook = {title, authorFirstName, authorLastName, publicationYear};
    }

    return (
        <div>
            <form>
                <div>Title: <input placeholder="Enter a title" onChange={e => setTitle(e.target.value)} /></div>
                <div>Author: <input placeholder="First name" onChange={e => setAuthorFirstName(e.target.value)} /> <input placeholder="Last name" onChange={e => setAuthorLastName(e.target.value)} /></div>
                <div><button type="submit" onClick={submitBook}>Add book</button></div>
            </form>
        </div>
    )
}

export default AddBookForm;
