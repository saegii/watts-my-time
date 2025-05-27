const Calculation = require('../models/calculation');
const ChargingType = require("../models/charging-type");

function validateCalculation(calculation) {
    const errors = {};
    if (typeof calculation !== "object" || calculation === null || Array.isArray(calculation)) {
        return {general: "Ungültige Anfragedaten. Erwartet wurde ein Objekt mit den Feldern: targetChargeLevel, batterySize, chargeType."};
    }
    const { targetChargeLevel, batterySize, chargeType } = calculation;
    if (typeof targetChargeLevel !== "number" || targetChargeLevel < 1 || targetChargeLevel > 100) {
        errors.targetChargeLevel = "Ziel-Ladestand muss zwischen 1 und 100 liegen.";
    }
    if (typeof batterySize !== "number" || batterySize < 1 || batterySize > 200) {
        errors.batterySize = "Batteriegrösse muss zwischen 1 und 200 kWh liegen.";
    }
    if (typeof chargeType !== "string" || !Object.values(ChargingType).includes(chargeType)) {
        errors.chargeType = "Ungültiger Ladetyp.";
    }
    return errors;
}
module.exports = {
    validateCalculation,
};