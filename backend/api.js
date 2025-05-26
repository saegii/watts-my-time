const express = require('express');
const path = require('path');
const app = express();
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../static')));
const dataService = require('./services/data-service');

app.get('/v1/calculator/calculations/latest', (req, res) => {
    res.status(200).send(dataService.loadLatestCalculations());
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server läuft unter http://localhost:${PORT}/watts-my-time.html`);
});