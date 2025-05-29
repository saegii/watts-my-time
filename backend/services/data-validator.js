const ChargingType = require("../models/charging-type");

function validateCalculation(calculation) {
    const errors = {};
    if (typeof calculation !== "object" || calculation === null || Array.isArray(calculation)) {
        return {general: "Ungültige Anfragedaten. Erwartet wurde ein Objekt mit den Feldern: targetChargeLevel, batterySize, chargeType."};
    }
    const requiredFields = ["currentChargeLevel", "targetChargeLevel", "batterySize", "chargeType"];
    const missingFields = requiredFields.filter(field => !(field in calculation));
    if (missingFields.length > 0) {
        return {
            general: `Fehlende Felder: ${missingFields.join(", ")}.`,
        };
    }
    const { currentChargeLevel, targetChargeLevel, batterySize, chargeType } = calculation;
    if (typeof currentChargeLevel !== "number" || currentChargeLevel < 0 || currentChargeLevel > 99 || currentChargeLevel >= targetChargeLevel) {
        errors.currentChargeLevel = "Aktueller Ladestand muss zwischen 0 und 99 liegen und kleiner als der Ziel-Ladestand sein.";
    }
    if (typeof targetChargeLevel !== "number" || targetChargeLevel < 1 || targetChargeLevel > 100 || currentChargeLevel >= targetChargeLevel) {
        errors.targetChargeLevel = "Ziel-Ladestand muss zwischen 1 und 100 liegen und grösser als der aktuelle Ladestand sein.";
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