const router = require("express").Router();
const scrapeRoutes = require("./scrape");




router.use("/scrape", scrapeRoutes);



module.exports = router;