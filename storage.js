const fs = require("fs");

function loadDebts() {
    const data = fs.readFileSync("./data/debts.json", "utf8");
    return JSON.parse(data);
}

function saveDebts(debts) {
    const data = JSON.stringify(debts, null, 2);
    fs.writeFileSync("./data/debts.json", data);
}

module.exports = {
    loadDebts,
    saveDebts
};