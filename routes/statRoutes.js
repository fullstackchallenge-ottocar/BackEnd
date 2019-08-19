const router = require('express').Router();
const restricted = require('./restricted-middleware');

const HttpReq = require('../helpers/http_requests_count_model');

// [GET] /api/stats - get all HTTP requests sent to the server
router.get('/', restricted, (req, res) => {
    HttpReq.findAll('http_requests_count')
    .select('id', 'GET', 'POST', 'PUT', 'DELETE', 'created_at')
    .then(http_requests_count => {
      res.status(200).json({ http_requests_count, decodedToken: req.decodedToken });
    })
    .catch(err => {
      res.send(err);
    });
});

module.exports = router;
