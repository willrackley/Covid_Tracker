var express = require('express');
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
var router = express.Router();

router.get("/usa", function(req, res) {

    axios.get("https://www.worldometers.info/coronavirus/country/us/").then(function(response) {
     
        var $ = cheerio.load(response.data);

        $('div[id="maincounter-wrap"]').each(function(i, element) {
            var result = {};

            result.totalCases = $(element).find("div.maincounter-number").children("span")
          .text().trim();

          console.log(result.totalCases)
        })
    })
});

//router.get('/states', function(req, res) {
    axios.get("https://www.worldometers.info/coronavirus/country/us/").then(function(response) {
     
        var $ = cheerio.load(response.data);

        $('table[id="usa_table_countries_today"]').each(function(i, element) {
            let result = {};

            let statesObject = {}

            let statesArray = []
            // result.states = $(element).find("tbody:nth-child(2)").children('tr:nth-child(3)').children('td:nth-child(1)')
            // .text().trim();

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


//});