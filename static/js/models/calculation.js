export class Calculation {
    constructor(data) {
        this.creationDate = new Date(data.creationDate);
        this.batterySize = data.batterySize;
        this.chargeType = data.chargeType;
        this.targetChargeLevel = data.targetChargeLevel;
        this.chargingDuration = data.chargingDuration ? data.chargingDuration : 1;
    }
    formatCalculation() {
        return `Ziel-Ladestand: ${this.targetChargeLevel}%, ` +
            `Batterie: ${this.batterySize} kWh, ` +
            `Ladetyp: ${this.chargeType}, ` +
            `Ladedauer: ${this.chargingDuration} Minute, ` +
            `Berechnungsdatum: ${this.creationDate.toLocaleString("de-CH")}`;
    }
    formatDuration() {
        const hours = Math.floor(this.chargingDuration / 60);
        const minutes = this.chargingDuration % 60;
        if (hours > 0 && minutes > 0) {
            return `${hours}h ${minutes}min`;
        } else if (hours > 0) {
            return `${hours}h`;
        } else {
            return `${minutes}min`;
        }
    }
}
