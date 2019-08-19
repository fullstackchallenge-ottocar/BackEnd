const router = require('express').Router();
const restricted = require('./restricted-middleware')

const Users = require('../helpers/users-model');

// [GET] /api/users - protect this endpoint so only logged in users can see it
router.get('/', restricted, (req, res) => {
    Users.findAll('users')
        .select('id', 'username')
        .then(users => {
            res.status(200).json({ users, decodedToken: req.decodedToken });
        })
        .catch(err => {
            res.send(err);
        });
});


// [GET] /api/users - get users by id
router.get('/:id', restricted, (req, res) => {
    let id = req.params.id;

    Users.findById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
                //res.status(200).json({ user, decodedToken: req.decodedToken });
            } else {
                res.status(400).json({ message: 'The specified user does not exist.' });
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
});

// [DELETE] /api/userid - delete user info
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Users.remove(id)
        .then((user) => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ errorMessage: 'User not deleted' });
            }
        })
        .catch((err) => res.status(500).json({
            errorMessage: "Error"
        }));
});


module.exports = router;
