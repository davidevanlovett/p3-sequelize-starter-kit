const db = require('../models');
const router = require('express').Router();
const isAuthenticated = require('../utils/middleware').isAuthenticated;
/**
 * Note - Read All
 */
router.get('/', isAuthenticated, function(req, res) {
    db.Note.findAll(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * Note - Read One
 */
router.get('/:id', function(req, res) {
    db.Note.findByPk(req.params.id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * Note - Create
 * Notice how we are also taking in the User Id! Important!
 */
router.post('/', isAuthenticated, function(req, res) {
    db.Note.create({
        UserId: req.user.id,
        ...req.body
    })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * Note - Update
 */
router.put('/:id', function(req, res) {
    db.Note.update(req.body, { where: { id: req.params.id }})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

/**
 * Note - Delete
 */
router.delete('/:id', function(req, res) {
    db.Note.destroy({ where: { id: req.params.id }})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

// Defining methods for the booksController
module.exports = router;
