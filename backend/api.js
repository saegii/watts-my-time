const express = require('express');
const app = express();
app.use(express.json());

const dataService = require('./services/data-service');

app.get('/v1/calculator/calculations/latest', (req, res) => {
    res.status(200).send(dataService.loadLatestCalculations());
});