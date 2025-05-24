const ChargingType = require('./charging-type');

class Calculation {

    constructor(data) {
        this.creationDate = data.creationDate ? data.creationDate : new Date();
        this.batterySize = data.batterySize;
        this.chargeType = ChargingType[data.chargeType] || ChargingType.AC;
        this.targetChargeLevel = data.targetChargeLevel;
    }

}

module.exports = Calculation;