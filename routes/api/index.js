const router = require("express").Router();
const scrapeRoutes = require("./scrape");
const usaRoutes = require("./usa_stats");
const statesRoutes = require("./states_stats");


router.use("/scrape", scrapeRoutes);
router.use("/usa_stats", usaRoutes );
router.use("/states_stats", statesRoutes)


module.exports = router;