const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Import the Trip model
const Model = mongoose.model('trips');

// GET: /trips - lists all the trips
// Regardless of outcome, the response must include an HTML status code
// and JSON message to the requesting client
const tripsList = async (req, res) => {
   const q = await Model
        .find({})
        .exec();
        

    if(!q)
    {
        return res
                .status(404)
                .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }
};

const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode })
        .exec();


    if(!q)
    {
        return res
                .status(404)
                .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode
};
