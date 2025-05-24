function loadLatestCalculation() {
    fetch("/v1/calculator/calculations/latest")
        .then(response => {
            if (!response.ok) {
                throw new Error("Keine Daten vorhanden");
            }
            return response.json();
        })
        .then(latestCalculation => {
            displayLatestCalculation(latestCalculation);
        })
        .catch(error => {
            document.getElementById("outputArea").textContent = "Error while loading: " + error.message;
        });
}

function displayLatestCalculation(data) {
    document.getElementById("latest-calculation").textContent =
        Object.entries(data).join(",");
}

window.addEventListener("DOMContentLoaded", () => {
    loadLatestCalculation();
});