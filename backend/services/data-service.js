function loadLatestCalculations() {
    const calculationsData = JSON.parse('../data/calculations.json');
    const calculations = calculationsData.map(data => {new Calculation(data)});
    calculations.sort((a, b) => new Date(a.date) - new Date(b.date));
    return new Calculation(calculations[0]);
}

module.exports = {
    loadLatestCalculations
};