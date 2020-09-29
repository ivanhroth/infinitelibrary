const express = require('express');
const handler = require('express-async-handler');
const { Book } = require('../../db/models');

const router = express.Router();

router.get('/:id', handler(async (req, res) => {
    const book = await Book.findByPk(req.params.match.id);
    console.log(book);
    res.json(book);
}));

module.exports = router;
