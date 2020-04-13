var express = require('express');
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
var router = express.Router();

router.get("/usa", function(req, res) {

    axios.get("https://www.worldometers.info/coronavirus/country/us/").then(function(response) {
        
        let $ = cheerio.load(response.data);

        $('table[id="usa_table_countries_today"]').each(function(i, element) {
            let result = {};
            let countryObject = {}

            result.countryTotalCases = $(element).find(`tbody:nth-child(2)`).children(`tr:nth-child(1)`).children('td:nth-child(2)')
            .text().trim();

            result.countryTotalDeaths = $(element).find(`tbody:nth-child(2)`).children(`tr:nth-child(1)`).children('td:nth-child(4)')
            .text().trim();

            countryObject = {
                totalCases: result.countryTotalCases,
                totalDeaths: result.countryTotalDeaths,
            }

          console.log(countryObject)
        })
    })
});

router.get('/states', function(req, res) {
    axios.get("https://www.worldometers.info/coronavirus/country/us/").then(function(response) {
        var $ = cheerio.load(response.data);

        $('table[id="usa_table_countries_today"]').each(function(i, element) {
            let result = {};

            let statesObject = {}

            let statesArray = []
            
            //loops through to create an object for the state statistics
            for (i=2; i < 53; i++) {
                result.stateName = $(element).find(`tbody:nth-child(2)`).children(`tr:nth-child(${i})`).children('td:nth-child(1)')
                .text().trim();
    
                result.stateTotalCases = $(element).find(`tbody:nth-child(2)`).children(`tr:nth-child(${i})`).children('td:nth-child(2)')
                .text().trim();
    
                result.stateTotalDeaths = $(element).find(`tbody:nth-child(2)`).children(`tr:nth-child(${i})`).children('td:nth-child(4)')
                .text().trim();
                
                statesObject = {
                    state: result.stateName,
                    totalCases: result.stateTotalCases,
                    totalDeaths: result.stateTotalDeaths
                }
                statesArray.push(statesObject)
            }
          console.log(statesArray) 
        })
    })
});