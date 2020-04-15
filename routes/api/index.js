const router = require("express").Router();
const scrapeRoutes = require("./scrape");
const usaRoutes = require("./usa_stats");


router.use("/scrape", scrapeRoutes);
router.use("/usa_stats", usaRoutes )


module.exports = router;