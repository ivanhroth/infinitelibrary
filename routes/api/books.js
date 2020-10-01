const express = require('express');
const handler = require('express-async-handler');
const { Book, Review } = require('../../db/models');

const bookAttributes = ['title', 'authorFirstName', 'authorLastName', 'publicationYear']

const router = express.Router();

router.get('/:id(\\d+)/reviews', handler(async (req, res) => {
    return await Review.findAll({
        where: {
            bookId: req.params.id
        }
    });
}));

router.post('/:id(\\d+)/reviews', handler(async (req, res) => {
    const review = await Review.create(req.body);
    // error handling?

}))

router.get('/:id(\\d+)', handler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    res.json(book);
}));

router.post('/find', handler(async (req, res) => {
    return await Book.findAll({
        where: JSON.parse(req.body)
    });
}))

module.exports = router;
