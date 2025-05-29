const Calculation = require("../models/calculation");
const chargingSpeeds = require("../models/charging-speeds");
const dataService = require('./data-service');

function calculateDuration(calculationInput) {
    const calculation = new Calculation(calculationInput);
    const chargingSpeed = chargingSpeeds.get(calculation.chargeType);
    const loadingStateDifference = calculation.targetChargeLevel - calculation.currentChargeLevel;
    const kwhToCharge = calculation.batterySize / 100 * loadingStateDifference;
    calculation.chargingDuration = Math.ceil(kwhToCharge / chargingSpeed * 60);
    dataService.saveCalculation(calculation);
    return calculation;
}
module.exports = {
    calculateDuration
};