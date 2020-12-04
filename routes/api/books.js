const express = require('express');
const handler = require('express-async-handler');
const { Book, Review, User } = require('../../db/models');

const bookAttributes = ['title', 'authorFirstName', 'authorLastName', 'publicationYear']

const router = express.Router();

router.post('/', handler(async (req, res) => {
    return await Book.create(req.body);
}))

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
    const book = await Book.findByPj(req.params.id);
    // update data
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
