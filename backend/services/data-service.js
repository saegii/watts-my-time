const fs = require('fs');
const path = require('path');
const Calculation = require('../models/calculation');

function loadLatestCalculations() {
    const filePath = path.join(__dirname, '../../data/calculations.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');

    const calculationsData = JSON.parse(jsonData);
    const calculations = calculationsData.map(data => new Calculation(data));
    calculations.sort((a, b) => new Date(a.date) - new Date(b.date));
    return calculations[0];
}

module.exports = {
    loadLatestCalculations
};