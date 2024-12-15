const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Import the Trip model
const Model = mongoose.model('trips');

// getUser function (copied and modified from getAuthor)
const getUser = (req, res, callback) => {
    // This would extract the user, likely from req.user or through a token.
    // Assuming it attaches the user object to the request, just like `getAuthor`.
    if (req.user) {
        return callback(req, res); // If user is found, proceed with the callback
    } else {
        return res.status(401).json({ message: 'User not authenticated' }); // Unauthorized if no user
    }
};

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    const q = await Model
        .find({})
        .exec();

    if (!q) {
        return res
            .status(404)
            .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }
};

const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({ 'code': req.params.tripCode })
        .exec();

    if (!q) {
        return res
            .status(404)
            .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }
};

// POST: /trips - Adds a new Trip
const tripsAddTrip = async (req, res) => {
    getUser(req, res, async (req, res) => {  // Make this function async
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        try {
            const q = await newTrip.save();  // Await works inside async function
            return res
                .status(201) // Resource created successfully
                .json(q);
        } catch (err) {
            return res
                .status(400) // Bad request
                .json(err);
        }
    });
};

// PUT: /trips/:tripCode - Update an existing Trip
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, async (req, res) => {  // Make this function async
        const q = await Model
            .findOneAndUpdate(
                { 'code': req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }
            )
            .exec();

        if (!q) { // Database returned no data
            return res
                .status(400)
                .json(err);
        } else { // Return resulting updated trip
            return res
                .status(201)
                .json(q);
        }
    });
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
