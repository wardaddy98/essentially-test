const dotenv = require('dotenv')
dotenv.config();


const POLYGON_API_KEY = process.env.POLYGON_API_KEY;


const getStockDataUrl = (stockSymbol, date) => {
    return `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/day/${date}/${date}?adjusted=true&sort=asc&limit=120&apiKey=${POLYGON_API_KEY}`
}


module.exports = {
    getStockDataUrl
}