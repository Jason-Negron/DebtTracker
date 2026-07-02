const prompt = require("prompt-sync")();

const { loadDebts, saveDebts } = require("./storage");

let debts = loadDebts();

const {
    viewDebts,
    printSummaryV2,
    makePayment,
    addDebt,
    removeDebt,
    calculateTotalDebt,
} = require("./debtFunctions");


function runMenu() {
    let running = true;

    while (running) {
        const now = new Date();
        const totalDebt = calculateTotalDebt(debts);

        console.log("====================================");
        console.log("         Debt Tracker v1.1");
        console.log("====================================");
        console.log();

        console.log("Date:");
        console.log(now.toDateString());
        console.log();
        console.log("Time:");
        console.log(now.toLocaleTimeString());
        console.log();

        console.log(`Loaded ${debts.length} debts.`);
        console.log();

        console.log("Total Outstanding Debt:");
        console.log(`$${totalDebt.toFixed(2)}`);

        console.log();
        console.log("====================================");
        console.log();
        

        console.log();
        console.log("========== Debt Tracker ==========");
        console.log("1. View Debts");
        console.log("2. View Summary");
        console.log("3. Make Payment");
        console.log("4. Add Debt");
        console.log("5. Remove Debt");
        console.log("6. Exit");
        console.log();

        let choice = prompt("Make a selection: ");

        switch (choice) {
            case "1":
                viewDebts(debts);
                break;

            case "2":
                printSummaryV2(debts);
                break;

            case "3":
                let debtName = prompt("Which debt would you like to make a payment to? ");
                let payment = Number(prompt("What will the payment amount be?: "));

                const paymentResult = makePayment(debts, debtName, payment);

                console.log();

                if (paymentResult.success === false) {
                    console.log(paymentResult.message);
                break;
                }

                console.log("Payment successful!");
                console.log();
                console.log(`Debt: ${paymentResult.debtName}`);
                console.log(`Old Balance: $${paymentResult.oldBalance.toFixed(2)}`);
                console.log(`Payment: $${paymentResult.payment.toFixed(2)}`);
                console.log(`New Balance: $${paymentResult.newBalance.toFixed(2)}`);

                saveDebts(debts);

                break;

            case "4":
                let newDebtName = prompt("Debt name: ");
                let newDebtBalance = Number(prompt("Balance: "));
                let newDebtApr = Number(prompt("APR: "));
                let newDebtMinimum = Number(prompt("Minimum Payment: "));

                const addResult = addDebt(debts, newDebtName, newDebtBalance, newDebtApr, newDebtMinimum);

                console.log();

                if (addResult.success === false) {
                    console.log(addResult.message);
                    break;
                }

                console.log("Debt added successfully.");
                console.log(`Name: ${addResult.debt.name}`);
                console.log(`Balance: $${addResult.debt.balance.toFixed(2)}`);
                console.log(`APR: ${addResult.debt.apr}%`);
                console.log(`Minimum Payment: $${addResult.debt.minimumPayment.toFixed(2)}`);

            saveDebts(debts);

            break;
            
            case "5":
                let selectDebt = prompt("Which debt would you like to remove?: ");
                let confirmRemove = prompt(`Are you sure you want to remove ${selectDebt}? (y/n): `).toLowerCase();

                const removeResult = removeDebt(debts, selectDebt, confirmRemove);

                console.log();

                if (removeResult.success === false) {
                    console.log(removeResult.message);
                    break;
                }

                console.log(`Debt "${removeResult.debt.name}" removed successfully.`);

                saveDebts(debts);

                break;
            
            case "6":
                console.log();
                console.log("Goodbye!");
                running = false;
                break;

            default:
                console.log();
                console.log("Please select an option in the menu.");
        }
    }
}

module.exports = runMenu;