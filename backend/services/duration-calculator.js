const Calculation = require("../models/calculation");
const chargingSpeeds = require("../models/charging-speeds");

function calculateDuration(calculationInput) {
    const calculation = new Calculation(calculationInput);
    const chargingSpeed = chargingSpeeds.get(calculation.chargeType);
    const currentLoadingState = 0;
    const loadingStateDifference = calculation.targetChargeLevel - currentLoadingState;
    const kwhToCharge = calculation.batterySize / 100 * loadingStateDifference;
    calculation.chargingDuration = Math.ceil(kwhToCharge / chargingSpeed * 60);
    return calculation;
}
module.exports = {
    calculateDuration
};