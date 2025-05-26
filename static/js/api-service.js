import {Calculation} from "./models/calculation.js";
import {CanvasDrawer} from "./services/battery-canvas.js";

function loadLatestCalculation() {
    fetch("/v1/calculator/calculations/latest")
        .then(response => {
            if (!response.ok) {
                throw new Error("Keine Daten vorhanden");
            }
            return response.json();
        })
        .then(latestCalculation => {
            if (latestCalculation.creationDate !== undefined) {
                const calculation = new Calculation(latestCalculation);
                document.getElementById("latest-calculation").textContent = calculation.formatCalculation();
            }
        })
        .catch(error => {
            document.getElementById("latest-calculation").textContent = "Fehler beim Laden: " + error.message;
        });
}
function calculate() {
    const payload = new Calculation({
        batterySize: Number(document.getElementById("battery-size").value),
        chargeType: document.getElementById("charge-type").value,
        targetChargeLevel: Number(document.getElementById("target-charge-level").value)
    });
    fetch("/v1/calculator/calculations/calculate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Berechnung fehlgeschlagen");
            }
            return response.json();
        })
        .then(currentCalculation => {
            const calculation = new Calculation(currentCalculation);
            document.getElementById("calculated-duration").textContent = calculation.formatDuration();
            loadLatestCalculation();
            const canvasDrawer = new CanvasDrawer();
            canvasDrawer.drawBatteryAnimation(0, calculation.targetChargeLevel);
            console.log(calculation.targetChargeLevel);
        })
        .catch(error => {
            document.getElementById("calculated-duration").textContent = "Fehler beim Berechnen: " + error.message;
        });
}
window.addEventListener("DOMContentLoaded", () => {
    loadLatestCalculation();
    document.getElementById("submit-calculation").addEventListener("click", calculate);
});