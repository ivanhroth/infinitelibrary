import React, { useState } from 'react';

const AddBookForm = () => {

    const [title, setTitle] = useState('');
    const [authorFirstName, setAuthorFirstName] = useState('');
    const [authorLastName, setAuthorLastName] = useState('');
    const [publicationYear, setPublicationYear] = useState('');

    return (
        <div>
            <form>
                <div>Title: <input placeholder="Enter a title" onChange={e => setTitle(e.target.value)} /></div>
                <div>Author: <input placeholder="First name" onChange={e => setAuthorFirstName(e.target.value)} /> <input placeholder="Last name" onChange={e => setAuthorLastName(e.target.value)} /></div>
                <div><button type="submit">Add book</button></div>
            </form>
        </div>
    )
}

export default AddBookForm;
