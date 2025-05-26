import {ModelFormatter} from "./services/model-formatter.js";

function loadLatestCalculation() {
    fetch("/v1/calculator/calculations/latest")
        .then(response => {
            if (!response.ok) {
                throw new Error("Keine Daten vorhanden");
            }
            return response.json();
        })
        .then(latestCalculation => {
            const formatter = new ModelFormatter();
            document.getElementById("latest-calculation").textContent = formatter.formatCalculation(latestCalculation);
        })
        .catch(error => {
            document.getElementById("latest-calculation").textContent = "Error while loading: " + error.message;
        });
}

window.addEventListener("DOMContentLoaded", () => {
    loadLatestCalculation();
});