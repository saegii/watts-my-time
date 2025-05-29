import {ChargingType} from "../models/charging-type.js";

const calculateButton = document.getElementById("submit-calculation");
const inputs = {
    currentCharge: document.getElementById("current-charge-level"),
    targetCharge: document.getElementById("target-charge-level"),
    batterySize: document.getElementById("battery-size"),
    chargeType: document.getElementById("charge-type"),
};
const errorMessages = {
    currentCharge: "Bitte geben Sie einen aktuellen Ladestand zwischen 0 und 99 ein, der kleiner als der Ziel-Ladestand ist.",
    targetCharge: "Bitte geben Sie einen Ziel-Ladestand zwischen 1 und 100 ein, der größer als der aktuelle Ladestand ist.",
    batterySize: "Bitte geben Sie eine Batteriegrösse zwischen 1 und 200 ein.",
    chargeType: "Bitte wählen Sie einen gültigen Ladetyp.",
};
const validators = {
    currentCharge: value => {
        const val = Number(value);
        const targetVal = inputs.targetCharge.value !== "" ? Number(inputs.targetCharge.value) : undefined;
        return (
            val >= 0 &&
            val <= 99 &&
            (val < targetVal || targetVal === undefined)
        );
    },
    targetCharge: value => {
        const val = Number(value);
        const currentVal = inputs.currentCharge.value !== "" ? Number(inputs.currentCharge.value) : undefined;
        return (
            val >= 1 &&
            val <= 100 &&
            (val > currentVal || currentVal === undefined)
        );
    },
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
        return validateField(name);
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
