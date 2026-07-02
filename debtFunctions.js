function findDebtByName(debts, debtName){
    for (let i = 0; i < debts.length; i++){
        if (debts[i].name.toLowerCase() === debtName.toLowerCase()){
            return debts[i];
        }
    }

    return null;
}

function findDebtIndexByName(debts, debtName) {
    for (let i = 0; i < debts.length; i++) {
        if (debts[i].name.toLowerCase() === debtName.toLowerCase()) {
            return i;
        }
    }

    return -1;
}

function viewDebts(debts) {
    console.log("====================================");
    console.log("         Current Debts");
    console.log("====================================");

    for (let i = 0; i < debts.length; i++) {

        console.log();
        console.log("====================================");
        console.log(`Debt #${i + 1}`);
        console.log();
        console.log(`Name                : ${debts[i].name}`);
        console.log(`Balance             : $${debts[i].balance.toFixed(2)}`);
        console.log(`APR                 : ${debts[i].apr}%`);
        console.log(`Minimum Payment     : $${debts[i].minimumPayment.toFixed(2)}`);
        console.log("====================================");
    }
}

function findLargestDebt(debts){

    let largestDebt = debts[0];

    for (let i = 0; i < debts.length; i++){
        if (debts[i].balance > largestDebt.balance){
            largestDebt = debts[i];
        }
    }
    return largestDebt
}

function calculateTotalDebt(debts) {
    let totalDebt = 0
    for (let i = 0; i < debts.length; i++){
        totalDebt += debts[i].balance;

    }
    return totalDebt;
}

function printSummaryV2(debts){
    let totalDebt = calculateTotalDebt(debts);
    let largestDebt = findLargestDebt(debts);

    let numberOfDebts = debts.length;
    let averageDebt = totalDebt / numberOfDebts;

    console.log(`======= Debt Summary =======`);
    console.log("");
    console.log(`Number of Debts: ${numberOfDebts}`);
    console.log("");
    console.log(`Total Debt: $${totalDebt}`);
    console.log("");
    console.log(`Largest Debt: ${largestDebt.name} ($${largestDebt.balance.toFixed(2)})`);
    console.log("");
    console.log(`Average Balance: $${averageDebt.toFixed(2)}`);
}

function makePayment(debts, debtName, payment) {
    const debt = findDebtByName(debts, debtName);

    if (debt === null) {
        return {
            success: false,
            message: "Debt not found."
        };
    }

    if (payment <= 0) {
        return {
            success: false,
            message: "Payment must be greater than zero."
        };
    }

    if (payment > debt.balance) {
        return {
            success: false,
            message: "Payment exceeds current balance."
        };
    }

    const oldBalance = debt.balance;

    debt.balance -= payment;

    return {
        success: true,
        debtName: debt.name,
        oldBalance: oldBalance,
        payment: payment,
        newBalance: debt.balance
    };
}

function addDebt(debts, name, balance, apr, minimumPayment) {
    const existingDebt = findDebtByName(debts, name);

    if (existingDebt !== null) {
        return {
            success: false,
            message: "A debt with that name already exists."
        };
    }

    const newDebt = {
        name: name,
        balance: balance,
        apr: apr,
        minimumPayment: minimumPayment
    };

    debts.push(newDebt);

    return {
        success: true,
        debt: newDebt
    };
}

function removeDebt(debts, debtName, confirmRemove) {
    const debtIndex = findDebtIndexByName(debts, debtName);

    if (debtIndex === -1) {
        return {
            success: false,
            message: "Debt not found."
        };
    }

    if (confirmRemove !== "y") {
        return {
            success: false,
            message: "Removal cancelled."
        };
    }

    const removedDebt = debts[debtIndex];

    debts.splice(debtIndex, 1);

    return {
        success: true,
        debt: removedDebt
    };
}

module.exports = {
    viewDebts,
    findLargestDebt,
    calculateTotalDebt,
    printSummaryV2,
    makePayment,
    addDebt,
    removeDebt,
    findDebtByName,
    findDebtIndexByName,
};