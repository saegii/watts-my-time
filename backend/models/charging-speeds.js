const ChargingType = require("./charging-type");

const chargingSpeeds = new Map([
        [ChargingType.TRICKLE, 2.3],
        [ChargingType.AC, 11],
        [ChargingType.WIRELESS, 11],
        [ChargingType.STANDARD, 22],
        [ChargingType.DC_FAST, 50],
        [ChargingType.RAPID, 150],
        [ChargingType.HPC, 250]
])
module.exports = chargingSpeeds;