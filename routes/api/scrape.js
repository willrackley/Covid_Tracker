let express = require('express');
let axios = require("axios");
let cheerio = require("cheerio");
let router = express.Router();

router.get("/usa", function(req, res) {
    let countryObject = {}
    axios.get("https://www.worldometers.info/coronavirus/country/us/").then(function(response) {
        
        let $ = cheerio.load(response.data);

        $('table[id="usa_table_countries_today"]').each(function(i, element) {
            let result = {};
            

            result.countryTotalCases = $(element).find(`tbody:nth-child(2)`).children(`tr:nth-child(1)`).children('td:nth-child(2)')
            .text().trim();

            result.countryTotalDeaths = $(element).find(`tbody:nth-child(2)`).children(`tr:nth-child(1)`).children('td:nth-child(4)')
            .text().trim();

            countryObject = {
                totalCases: result.countryTotalCases,
                totalDeaths: result.countryTotalDeaths,
            }
        })
        res.send(countryObject)
    })
});

router.get('/states', function(req, res) {
    let statesArray = []
    axios.get("https://www.worldometers.info/coronavirus/country/us/").then(function(response) {
        var $ = cheerio.load(response.data);

        $('table[id="usa_table_countries_today"]').each(function(i, element) {
            let result = {};

            let statesObject = {}

            //loops through to create an object for the state statistics
            for (i=2; i < 53; i++) {
                result.stateName = $(element).find(`tbody:nth-child(2)`).children(`tr:nth-child(${i})`).children('td:nth-child(1)')
                .text().trim();
    
                result.stateTotalCases = $(element).find(`tbody:nth-child(2)`).children(`tr:nth-child(${i})`).children('td:nth-child(2)')
                .text().trim();
    
                result.stateTotalDeaths = $(element).find(`tbody:nth-child(2)`).children(`tr:nth-child(${i})`).children('td:nth-child(4)')
                .text().trim();
                
                statesObject = {
                    key: i,
                    state: result.stateName,
                    totalCases: parseInt(result.stateTotalCases.replace(/,/g,'')),
                    totalDeaths: parseInt(result.stateTotalDeaths.replace(/,/g,''))
                }
                statesArray.push(statesObject)
            }
        })
        res.send(statesArray)
    })
});

module.exports = router;