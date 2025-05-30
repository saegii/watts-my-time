const ChargingType = require('./charging-type');

class Calculation {
    constructor(data) {
        this.creationDate = data.creationDate ? data.creationDate : new Date();
        this.batterySize = data.batterySize;
        this.chargeType = ChargingType[data.chargeType];
        this.targetChargeLevel = data.targetChargeLevel;
        this.currentChargeLevel = data.currentChargeLevel;
        this.chargingDuration = data.chargingDuration;
    }
}
module.exports = Calculation;