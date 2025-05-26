import {Calculation} from "../models/calculation.js";

export class ModelFormatter {
    formatCalculation(calculationData) {
        const calculation = new Calculation(calculationData);
        return `Ziel-Ladestand: ${calculation.targetChargeLevel}%, ` +
            `Batterie: ${calculation.batterySize} kWh, ` +
            `Ladetyp: ${calculation.chargeType}, ` +
            `Ladedauer: ${calculation.chargingDuration} Minute, ` +
            `Berechnungsdatum: ${calculation.creationDate.toLocaleString("de-CH")}`;
    }
}
