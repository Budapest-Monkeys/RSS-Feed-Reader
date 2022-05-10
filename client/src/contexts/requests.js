const axios = require("axios");
const corsUrl = "https://api.rss2json.com/v1/api.json?rss_url=";

export const getFeedListing = url => axios.get(`${corsUrl}${url}`);