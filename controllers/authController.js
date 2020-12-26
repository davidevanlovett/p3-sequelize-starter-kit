const jwt = require('jsonwebtoken');
const util = require('util');
const router = require('express').Router();
const db = require('../models');

const signAsync = util.promisify(jwt.sign);

//
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await db.User.scope('withPassword').findOne({ where: {email:email }});
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isGoodPassword = await user.validPassword(password);
        if (!isGoodPassword) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        const token = await signAsync(
            { id: user.id, email: user.email },
            process.env.SECRET,
            {
                expiresIn: '24h',
                algorithm: 'HS256'
            }
        );
        res.json({
            token, user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Route for signing up a user.
//
router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await db.User.create({
            email,
            password
        });
        if (!user) {
            res.status(401).json({ message: 'User not found' });
        }
        const token = await signAsync(
            { id: user.id, email: user.email },
            process.env.SECRET,
            {
                expiresIn: '24h',
                algorithm: 'HS256'
            }
        );
        res.json({
            token, user: {
                id: user.id,
                email: user.email
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
