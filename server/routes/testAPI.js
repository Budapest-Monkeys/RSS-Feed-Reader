const express = require('express')
const jsdom = require('jsdom')
const router  = express.Router();
const {JSDOM} = jsdom;
var fs = require("fs");


router.get('/', (req, res) => {
    res.status(200).json({"users" : ["userOne", "userTwo", "userThree", "userFour"]});
});

router.post('/', (req,res) => {
    const url = req.body;
    
    JSDOM.fromURL(url.url).then(dom => {
        const html = dom.serialize();
        var xml = html
        var parseString = require('xml2js').parseString;
        parseString(xml, function (err, result) {
            jsonString = JSON.stringify(result)
            jsonParse = JSON.parse(jsonString)
            console.log(jsonParse["rss"]["channel"][0]["item"])
        });
    })
    res.status(200).send(`User sent url of ${url.url}`);
});

module.exports = router;
