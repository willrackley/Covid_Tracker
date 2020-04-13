const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Message
          .find(req.query)
          .sort({ postedDate: -1 })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      }
}
