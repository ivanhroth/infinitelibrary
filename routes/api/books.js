const express = require('express');
const handler = require('express-async-handler');
const fetch = require('node-fetch');
const { Book, Review, User } = require('../../db/models');

const bookAttributes = ['title', 'authorFirstName', 'authorLastName', 'publicationYear']

const router = express.Router();

router.post('/', handler(async (req, res) => {
    const book = req.body;
    if (book.publicationYear == "") book.publicationYear = null;
    const processedTitle = book.title.split(" ").join("+");
    const processedAuthorLastName = book.authorLastName.split(" ").join("+");
    const searchTerm = `intitle:"${processedTitle}"+inauthor:"${processedAuthorLastName}"`;
    const searchURL = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${process.env.API_KEY}`;
    const resolution = await fetch(searchURL);
    let imageURL = null;
    if (resolution.ok){
        const result = await resolution.json();
        const volumeURL = result.items[0].selfLink;
        const volumeRes = await fetch(volumeURL);
        if (volumeRes.ok){
            const volume = await volumeRes.json();
            console.log(volume);
            if (volume.volumeInfo.imageLinks) imageURL = volume.volumeInfo.imageLinks.thumbnail;
            console.log(imageURL);
        } else {
            console.log(volumeRes);
        }
    } else {
        console.log(resolution);
    }
    return await Book.create({...req.body, coverImageUrl: imageURL});
}));

router.get('/:id(\\d+)/reviews', handler(async (req, res) => {
    const reviews = await Review.findAll({
        include: [
            {
                model: User
            }
        ],
        where: {
            bookId: req.params.id
        }
    });
    res.json(reviews);
}));

router.post('/:id(\\d+)/reviews', handler(async (req, res) => {
    const newReview = await Review.create(req.body);
    res.json(newReview);
}))

router.get('/:id(\\d+)', handler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.json(book);
}));

router.put('/:id(\\d+)', handler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    book.set(req.body);
    res.json(book)
} ))

router.post('/find', handler(async (req, res) => {
    return await Book.findAll({
        where: JSON.parse(req.body)
    });
}));

router.get('/recent', handler(async (req, res) => {
    const recentBooks = await Book.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']]
    });
    res.json(recentBooks);
}))

module.exports = router;
