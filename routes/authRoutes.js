const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../helpers/users-model.js');
const hashPassword = require('../helpers/hashPassword');
const tokenService = require('./tokenService.js');

router.post('/register', (req, res) => {
  let user = req.body;
  //console.log(user)

  if (!user.username || !user.password || !user.email) {
    res.status(401).json({
      message: 'Please provide username, password and email to register.'
    });
  } else {
    const hash = hashPassword(user.password);
    //console.log(hash)
    user.password = hash;

    Users.add(user)
      .then(registered => {
        //console.log(registered)
        const token = tokenService.makeTokenFromUser(registered);
        res.status(201).json({
          registered,
          token
        });
      })
      .catch(error => {
        res.status(500).json(error);
      });
  }
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.makeTokenFromUser(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          id: user.id,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
