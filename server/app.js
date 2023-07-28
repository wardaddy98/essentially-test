// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");
const { getStockDataUrl } = require('./constants');


const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', async (req, res) => {

    try {
        const { date, stockSymbol } = req.body;

        if (!date || !stockSymbol) {
            return res.status(401).json("Missing details!");
        }

        const result = await axios.get(getStockDataUrl(stockSymbol, date))


        const stockData = result.data.results[0];

        const response = {
            stock: result.data.ticker,
            details:{
                open: stockData?.o,
                low: stockData?.l,
                close: stockData?.c,
                volume: stockData?.v,
                high: stockData?.h,
            }
        }
        return res.status(200).json({
            status: 200,
            message: 'Stock Data Loaded successfully!',
            body: response
        })

    } catch (err) {
        console.log(err)
    }





});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));