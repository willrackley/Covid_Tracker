let express = require('express');
let axios = require("axios");
let router = express.Router();
let db = require('../../models')

//find all saved usa states
router.get("/", function(req, res) {
    db.Usa
        .find(req.query)
        .sort({ created_at: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
});

//save usa stats
router.post("/saved", function(req, res) {
    db.Usa.create(req.body)
    .then(dbModel => {
        console.log('success')
        res.json(dbModel)
    })
    .catch(err => console.log(err))
})

module.exports = router;