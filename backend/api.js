const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../static')));
const dataService = require('./services/data-service');
const durationCalculator = require("./services/duration-calculator");

app.get('/v1/calculator/calculations/latest', (req, res) => {
    res.status(200).send(dataService.loadLatestCalculations());
});

app.post('/v1/calculator/calculations/calculate', (req, res) => {
    res.status(200).send(durationCalculator.calculateDuration(req.body));
});

app.delete('/v1/calculator/calculations', (req, res) => {
    dataService.clearHistory();
    res.status(200).send();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Successfully started project - http://localhost:${PORT}/watts-my-time.html`);
});