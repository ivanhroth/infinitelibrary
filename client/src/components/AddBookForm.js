import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from 'react-bootstrap';

const AddBookForm = () => {

    const [title, setTitle] = useState('');
    const [authorFirstName, setAuthorFirstName] = useState('');
    const [authorLastName, setAuthorLastName] = useState('');
    const [publicationYear, setPublicationYear] = useState('');

    const dispatch = useDispatch();

    const internalFind = async book => {
        // const resExactFind = await fetch('/api/books/find', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     body: JSON.stringify(book)
        // });
        // const exactFindResult = await resExactFind.json();
        // if(exactFindResult) return exactFindResult;
        // else {
        //     return false;
        // }
        return false;
    }

    const postBook = async book => {
        const res = await fetch('/api/books', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(book)
        });
        if (!res.ok){
            console.log("res: ", res);
            debugger
        } else {
            return await res.json();
        }
    }

    const submitBook = e => {
        e.preventDefault();
        const newBook = {title, authorFirstName, authorLastName, publicationYear};
        const findResults = internalFind(newBook);
        if(findResults){

        }
        postBook(newBook);
    }

    return (
        <div>
            <form>
                <div>Title: <input placeholder="Enter a title" onChange={e => setTitle(e.target.value)} /></div>
                <div>Author: <input placeholder="First name" onChange={e => setAuthorFirstName(e.target.value)} /> <input placeholder="Last name" onChange={e => setAuthorLastName(e.target.value)} /></div>
                <div>Publication year: <input placeholder="Enter a year" onChange={e => setPublicationYear(e.target.value)} /></div>
                <div><Button type="submit" onClick={submitBook}>Add book</Button></div>
            </form>
        </div>
    )
}

export default AddBookForm;
