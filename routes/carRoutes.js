const router = require('express').Router();
const restricted = require('./restricted-middleware');

const Cars = require('../helpers/cars-model');
const HttpReq = require('../helpers/http_requests_count_model');

// [GET] /api/cars - get all cars in db - protect this endpoint so only logged in users can see it
router.get('/', restricted, (req, res) => {
    Cars.findAll('cars')
        .select('id', 'user_id', 'make', 'model', 'year', 'active', 'created_at')
        .then(cars => {
            res.status(200).json({ cars, decodedToken: req.decodedToken });
            // Add get request count for stats
            HttpReq.add({ GET: 1 });
        })
        .catch(err => {
            res.send(err);
        });
});

// [GET] /api/cars/carCount - get cars count
router.get('/carCount', restricted, (req, res) => {
    Cars.getCarsCount('cars')
        .then(cars => {
            res.status(200).json({ cars, decodedToken: req.decodedToken });
        })
        .catch(err => {
            res.send(err);
        });
});

// [GET] /api/cars/activeCarcCount - get cars count
router.get('/activeCarCount', restricted, (req, res) => {
    Cars.getActiveCount('cars')
        .then(cars => {
            res.status(200).json({ cars, decodedToken: req.decodedToken });
        })
        .catch(err => {
            res.send(err);
        });
});

// [GET] /api/cars/InactiveCarCount - get cars count
router.get('/inactiveCarCount', restricted, (req, res) => {
    Cars.getInactiveCount('cars')
        .then(cars => {
            res.status(200).json({ cars, decodedToken: req.decodedToken });
        })
        .catch(err => {
            res.send(err);
        });
});


// [GET] /api/cars/id - get cars by id
router.get('/:id', restricted, (req, res) => {
    let id = req.params.id;

    Cars.findById(id)
        .then(car => {
            if (car) {
                res.status(200).json(car);
                HttpReq.add({ GET: 1 });
                //res.status(200).json({ user, decodedToken: req.decodedToken });
            } else {
                res.status(400).json({ message: 'The specified id does not exist.' });
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
});


// [POST] /api/cars - add a new car
router.post('/', (req, res) => {
    const newCar = req.body;

    if (!newCar.make) {
        res.status(400).json({ message: 'Please provide a make for this car.' });
    } else {
        Cars.add(newCar)
            .then(car => {
                res.status(201).json(car);
                HttpReq.add({ POST: 1 });
            })
            .catch(err => {
                res.status(500).json(err.message);
            });
    }
});

// [PUT] /api/cars/id - Update car
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    Cars.update(id, changes)
        .then(changes => {
            if (changes) {
                res.status(200).json({ message: 'Car details successfully updated.' });
                HttpReq.add({ PUT: 1 });
            } else {
                res.status(404).json({ message: 'The specified car does not exist.' });
            }
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
});

// [DELETE] /api/cars/:id - Delete car
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Cars.remove(id)
        .then(count => {
            res.status(200).json({ message: 'Car successfully deleted.' });
            HttpReq.add({ DELETE: 1 });
        })
        .catch(err => {
            res.status(500).json(err.message);
        });
});



module.exports = router;
