class Calculation {

    constructor(data) {
        this.creationDate = new Date();
        this.batterySize = data.batterySize;
        this.chargeType = ChargingType[data.chargeType] || ChargingType.AC;
        this.targetChargeLevel = data.targetChargeLevel;
    }

}
