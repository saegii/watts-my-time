const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../static')));
const dataService = require('./services/data-service');
const durationCalculator = require("./services/duration-calculator");
const dataValidator = require("./services/data-validator");

app.get('/v1/calculator/calculations/latest', (req, res) => {
    try {
        const latest = dataService.loadLatestCalculations();
        res.status(200).json({ latestCalculation: latest });
    } catch(err) {
        return res.status(500).json({ error: "Interner Serverfehler" });
    }
});

app.post('/v1/calculator/calculations/calculate', (req, res) => {
    try {
        if (req.headers['content-type'] !== 'application/json') {
            return res.status(415).json({ error: "Content-Type muss application/json sein." });
        }
        const errors = dataValidator.validateCalculation(req.body);
        if (Object.keys(errors).length > 0) {
            res.status(400).send({errors});
        } else {
            res.status(200).send(durationCalculator.calculateDuration(req.body));
        }
    } catch(err) {
        return res.status(500).json({ error: "Interner Serverfehler" });
    }
});

app.delete('/v1/calculator/calculations', (req, res) => {
    try {
        dataService.clearHistory();
        res.status(204).send();
    } catch(err) {
        return res.status(500).json({ error: "Interner Serverfehler" });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Successfully started project - http://localhost:${PORT}/watts-my-time.html`);
});