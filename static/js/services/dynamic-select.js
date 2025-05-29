import {ChargingTypeInfo} from "../models/charging-type-info.js";

function loadImage(select) {
    const image = document.getElementById('charging-type-image');
    const selected = select.value;
    const info = ChargingTypeInfo[selected];

    if (info) {
        image.src = info.imageUrl;
        image.style.display = 'block';
    } else {
        image.style.display = 'none';
    }
}

export function createChargingTypeSelect() {
    const select = document.getElementById('charge-type');
    for (const key in ChargingTypeInfo) {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = ChargingTypeInfo[key].label;
        select.appendChild(option);
    }
    select.addEventListener('change', function () {
        loadImage(select);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    createChargingTypeSelect();
});
