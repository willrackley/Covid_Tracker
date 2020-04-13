var express = require('express');
var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
var router = express.Router();

router.get("/usa", function(req, res) {

    axios.get("https://www.worldometers.info/coronavirus/country/us/").then(function(response) {
     
        // var $ = cheerio.load(response.data);

        // $('div[id="maincounter-wrap"]').each(function(i, element) {
        //     var result = {};

        //     result.totalCases = $(element).find("div.maincounter-number").children("span")
        //   .text().trim();

        //   console.log('yo')
        // })
        console.log(response)

})


});