const express = require('express');
const handler = require('express-async-handler');
const { Book } = require('../../db/models');

const bookAttributes = ['title', 'authorFirstName', 'authorLastName', 'publicationYear']

const router = express.Router();

router.get('/:id(\\d+)', handler(async (req, res) => {
    const book = await Book.findByPk(req.params.id);
    console.log(book);
    res.json(book);
}));

router.post('/find', handler(async (req, res) => {
    return await Book.findAll({
        where: JSON.parse(req.body)
    });
}))

module.exports = router;
