const router = require('express').Router();
const restricted = require('./restricted-middleware');

const HttpReq = require('../helpers/http_requests_count_model');

// [GET] /api/stats/getCount - get all GET requests sent to the server
router.get('/', restricted, (req, res) => {
    HttpReq.getCount('http_requests_count')
    .then(http_requests_count => {
        res.status(200).json({ http_requests_count, decodedToken: req.decodedToken });
    })
    .catch(err => {
        res.send(err);
    });
});

module.exports = router;
