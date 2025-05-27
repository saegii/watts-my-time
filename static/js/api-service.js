import {Calculation} from "./models/calculation.js";
import {CanvasDrawer} from "./services/battery-canvas.js";
import {updateButtonState} from "./services/validation.js";

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
            } else {
                document.getElementById("latest-calculation").textContent = "Noch keine Berechnung durchgeführt.";
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
            const canvasDrawer = new CanvasDrawer();
            canvasDrawer.drawBatteryAnimation(0, calculation.targetChargeLevel);
            loadLatestCalculation();
        })
        .catch(error => {
            document.getElementById("calculated-duration").textContent = "Fehler beim Berechnen: " + error.message;
        });
}
function clearHistory() {
    fetch("/v1/calculator/calculations", {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Löschen fehlgeschlagen");
            }
            loadLatestCalculation();
        })
        .catch(error => {
            alert("Fehler beim Löschen: " + error.message);
        });
}
function loadCookie() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('latestCalculation='));

    if (cookieValue) {
        try {
            let decoded = decodeURIComponent(cookieValue.split('=')[1]);
            const saved = JSON.parse(decoded);
            if (saved.chargeType) document.getElementById("charge-type").value = saved.chargeType;
            if (saved.batterySize) document.getElementById("battery-size").value = saved.batterySize;
            if (saved.targetChargeLevel) document.getElementById("target-charge-level").value = saved.targetChargeLevel;
            updateButtonState();
        } catch (e) {
            console.error("Cookie konnte nicht gelesen werden:", e);
        }
    }
}
window.addEventListener("DOMContentLoaded", () => {
    loadLatestCalculation();
    document.getElementById("submit-calculation").addEventListener("click", calculate);
    document.getElementById("clear-history").addEventListener("click", clearHistory);
    const canvasDrawer = new CanvasDrawer();
    canvasDrawer.drawBatteryAnimation(0, 0);
    loadCookie();
});