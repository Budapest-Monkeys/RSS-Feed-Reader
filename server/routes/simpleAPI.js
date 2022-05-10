const express = require('express')
const router = express.Router()
const jsdom = require('jsdom')
const {JSDOM} = jsdom;

function itemParser(listOfItems) {
    newList = []
    size = Object.keys(listOfItems).length;
    for(i = 0; i < size; i++) {
        item = listOfItems[i]
        if(item["enclosure"] != undefined) {
            parsedItem = { "title": item["title"][0],
            "pubDate": item["pubDate"][0],
            "image": item["itunes:image"][0]["$"]["href"],
            "description": removeTags(item["description"][0]),
            "audio": { "duration": item["enclosure"][0]["$"]["length"], "type" : item["enclosure"][0]["$"]["type"], "url" : item["enclosure"][0]["$"]["url"] }
            }
        }
        newList.push(parsedItem)
    }
    return newList;
}

// Remove tags function from GEEKSFORGEEKS. (thank you for making my life easy.)
function removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
          
    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}

const myFeedParser = function (req, res, next) {
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
                items = jsonParse["rss"]["channel"][0]["item"]
                parsedItems = itemParser(items)
                res.status(200).send({parsedItems})
            }
        });
    })
}



router.use(myFeedParser)

router.post('/', (req, res, next) => {   
});

module.exports = router;