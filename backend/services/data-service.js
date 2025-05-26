const fs = require('fs');
const path = require('path');
const Calculation = require('../models/calculation');

function loadLatestCalculations() {
    const filePath = path.join(__dirname, '../../data/calculations.json');
    const calculationsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const calculations = calculationsData.map(data => new Calculation(data));
    return calculations.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))[0];
}

module.exports = {
    loadLatestCalculations
};