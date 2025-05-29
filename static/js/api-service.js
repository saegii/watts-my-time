import {Calculation} from "./models/calculation.js";
import {CanvasDrawer} from "./services/battery-canvas.js";
import {updateButtonState} from "./services/validation.js";

function loadCalculationHistory() {
    fetch("/v1/calculator/calculations")
        .then(response => {
            if (!response.ok) {
                throw new Error("Keine Daten vorhanden");
            }
            return response.json();
        })
        .then(calculations => {
            const container = document.getElementById("calculation-history-container");
            container.innerHTML = "";
            if (!Array.isArray(calculations) || calculations.length === 0) {
                container.textContent = "Noch keine Berechnungen vorhanden...";
                return;
            }
            calculations.forEach((data, index) => {
                const calculation = new Calculation(data);
                const calculationDiv = document.createElement("div");
                calculationDiv.className = "w3-padding w3-margin-bottom";
                calculationDiv.textContent = calculation.formatCalculation();
                container.appendChild(calculationDiv);
                if (index < calculations.length - 1) {
                    const divider = document.createElement("hr");
                    divider.className = "w3-border-light-grey";
                    container.appendChild(divider);
                }
            });
        })
        .catch(error => {
            document.getElementById("calculation-history-container").textContent = "Fehler beim Laden: " + error.message;
        });
}
function calculate() {
    const payload = new Calculation({
        batterySize: Number(document.getElementById("battery-size").value),
        chargeType: document.getElementById("charge-type").value,
        targetChargeLevel: Number(document.getElementById("target-charge-level").value),
        currentChargeLevel: Number(document.getElementById("current-charge-level").value)
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
            canvasDrawer.drawBatteryAnimation(calculation.currentChargeLevel, calculation.targetChargeLevel);
            loadCalculationHistory();
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
            loadCalculationHistory();
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
            const select = document.getElementById("charge-type");
            if (saved.chargeType) select.value = saved.chargeType;
            select.dispatchEvent(new Event('change'));
            if (saved.batterySize) document.getElementById("battery-size").value = saved.batterySize;
            if (saved.targetChargeLevel) document.getElementById("target-charge-level").value = saved.targetChargeLevel;
            updateButtonState();
        } catch (e) {
            console.error("Cookie konnte nicht gelesen werden:", e);
        }
    }
}
window.addEventListener("DOMContentLoaded", () => {
    loadCalculationHistory();
    loadCookie();
    document.getElementById("submit-calculation").addEventListener("click", calculate);
    document.getElementById("clear-history").addEventListener("click", clearHistory);
    const canvasDrawer = new CanvasDrawer();
    canvasDrawer.drawBatteryAnimation(0, 0);
});