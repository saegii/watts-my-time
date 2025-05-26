export class Calculation {
    constructor(data) {
        this.creationDate = new Date(data.creationDate);
        this.batterySize = data.batterySize;
        this.chargeType = data.chargeType;
        this.targetChargeLevel = data.targetChargeLevel;
        this.chargingDuration = data.chargingDuration ? data.chargingDuration : 1;
    }
}
