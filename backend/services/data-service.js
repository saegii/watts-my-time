const fs = require('fs');
const path = require('path');
const Calculation = require('../models/calculation');

function loadAllCalculations() {
    const filePath = path.join(__dirname, '../../data/calculations.json');
    if (!fs.existsSync(filePath)) {
        return {};
    }
    const calculationsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const calculations = calculationsData.map(data => new Calculation(data));
    calculations.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
    return calculations;
}
function saveCalculation(calculation) {
    const filePath = path.join(__dirname, '../../data/calculations.json');
    let calculations = [];
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        try {
            calculations = JSON.parse(fileContent);
        } catch (e) {
            console.error("Error while parsing JSON file:", e.message);
        }
    }
    calculations.push(new Calculation(calculation));
    fs.writeFileSync(filePath, JSON.stringify(calculations, null, 2), 'utf-8');
}
function clearHistory() {
    const filePath = path.join(__dirname, '../../data/calculations.json');
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}
module.exports = {
    loadAllCalculations,
    saveCalculation,
    clearHistory,
};