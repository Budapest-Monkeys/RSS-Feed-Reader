const express = require('express')
const jsdom = require('jsdom')
const {parse} = require('himalaya')
const router  = express.Router();
const {JSDOM} = jsdom;

router.get('/', (req, res) => {
    res.status(200).json({"users" : ["userOne", "userTwo", "userThree", "userFour"]});
});

router.post('/', (req,res) => {
    const url = req.body;
    JSDOM.fromURL(url.url).then(dom => {
        const html = dom.serialize();
        const json = parse(html);
        console.log(json[0]["children"]);
    })
    res.send(`User sent url of ${url.url}`);
});

module.exports = router;
