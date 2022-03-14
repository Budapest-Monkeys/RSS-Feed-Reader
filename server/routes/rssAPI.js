const express = require('express')
const jsdom = require('jsdom')
const router  = express.Router();
const {JSDOM} = jsdom;
var fs = require("fs");


router.get('/', (req, res, next) => {
    res.status(200).json({"users" : ["userOne", "userTwo", "userThree", "userFour"]});
});

router.post('/', (req, res, next) => {
    const url = req.body;
    
    JSDOM.fromURL(url.url).then(dom => {
        const html = dom.serialize();
        var xml = html
        var parseString = require('xml2js').parseString;
        parseString(xml, function (err, result) {
            if(result == undefined) {
                err = new Error("Undefined")
                err.status = 400
                next(err)
            }
            else {
                jsonString = JSON.stringify(result)
                jsonParse = JSON.parse(jsonString)
                res.status(200).send(jsonParse["rss"]["channel"][0]["item"])
            }
        });
    })
});

module.exports = router;
