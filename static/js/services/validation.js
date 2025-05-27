import {ChargingType} from "../models/charging-type";

const calculateButton = document.getElementById("submit-calculation");
const inputs = {
    targetCharge: document.getElementById("target-charge-level"),
    batterySize: document.getElementById("battery-size"),
    chargeType: document.getElementById("charge-type"),
};
const errorMessages = {
    targetCharge: "Bitte geben Sie einen Ziel-Ladestand zwischen 1 und 100 ein.",
    batterySize: "Bitte geben Sie eine Batteriegrösse zwischen 1 und 200 ein.",
    chargeType: "Bitte wählen Sie einen gültigen Ladetyp.",
};
const validators = {
    targetCharge: value => value >= 1 && value <= 100,
    batterySize: value => value >= 1 && value <= 200,
    chargeType: value => Object.values(ChargingType).includes(value),
};
function showError(input, message) {
    removeError(input);
    const error = document.createElement("div");
    error.className = "w3-text-red validation-error";
    error.innerText = message;
    input.parentElement.appendChild(error);
    calculateButton.disabled = true;
}
function removeError(input) {
    const existing = input.parentElement.querySelector(".validation-error");
    if (existing) {
        existing.remove();
    }
    calculateButton.disabled = false;
}
function validateField(name) {
    const input = inputs[name];
    const value = input.value;
    const valid = validators[name](value);
    if (input.dataset.touched === "true") {
        if (!valid) {
            showError(input, errorMessages[name]);
            return false;
        } else {
            removeError(input);
            return true;
        }
    } else {
        removeError(input);
        return true;
    }
}
function validateAll() {
    return Object.keys(inputs).every(name => {
        return validators[name](inputs[name].value);
    });
}
export function updateButtonState() {
    calculateButton.disabled = !validateAll();
}
document.addEventListener("DOMContentLoaded", () => {
    Object.keys(inputs).forEach(name => {
        const input = inputs[name];
        input.dataset.touched = "false";
        input.addEventListener("input", () => {
            if (input.dataset.touched === "false") {
                input.dataset.touched = "true";
            }
            validateField(name);
            updateButtonState();
        });
    });
    updateButtonState();
});
