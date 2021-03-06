import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button, Container, Form } from 'react-bootstrap';

import { actions, thunks } from '../store/books';
import { Redirect } from 'react-router-dom';

const AddBookForm = () => {

    const [title, setTitle] = useState('');
    const [authorFirstName, setAuthorFirstName] = useState('');
    const [authorLastName, setAuthorLastName] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const [submitted, setSubmitted] = useState(false);

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

    const { postBook } = thunks;

    /* const postBook = async book => {
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
    } */

    const submitBook = e => {
        e.preventDefault();
        const newBook = {title, authorFirstName, authorLastName, publicationYear};
        const findResults = internalFind(newBook);
        if(findResults){

        }
        //dispatch(setCoverImage(newBook));
        dispatch(postBook(newBook));
        setSubmitted(true);
    }

    if (!submitted) return (
        <Container>
            <Form>
                <div>Title: <input placeholder="Enter a title" onChange={e => setTitle(e.target.value)} /></div>
                <div>Author: <input placeholder="First name" onChange={e => setAuthorFirstName(e.target.value)} /> <input placeholder="Last name" onChange={e => setAuthorLastName(e.target.value)} /></div>
                <div>Publication year: <input placeholder="Enter a year" onChange={e => setPublicationYear(e.target.value)} /></div>
                <div><Button type="submit" onClick={submitBook}>Add book</Button></div>
            </Form>
        </Container>
    )
    else return <Redirect to="/" />
}

export default AddBookForm;
