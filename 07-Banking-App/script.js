/************************* ACCESSING HTML *************************/
let accountName = document.querySelector('#display-name');
let currentBalance = document.querySelector("#bal-end-val");
let customerAccount = document.querySelector('#customer-account');
let logoutBtn = document.querySelector('#logout');
let newUser = document.querySelector('#customer-name');
let registration = document.querySelector("#registration");
let registrationBtn = document.querySelector("#reg-btn");
let submitBtn = document.querySelector("#submit-transaction");
let transactionAmount = document.querySelector("#transaction-amount");
let transactions = document.querySelector("#transactions")
let transactionType = document.querySelector("#transaction-type") 
let transactionTable = document.querySelector("#transaction-table");
/*******************************************************************/

/************************* EVENT LISTENERS *************************/
registrationBtn.addEventListener("click", toggleCustomerAccount);
registrationBtn.addEventListener("click", displayCustomerAccount);
registrationBtn.addEventListener("click", () => { hideToggle(registration); });
submitBtn.addEventListener("click", () => { checkTransaction(); });
logoutBtn.addEventListener('click', logoutFunction);
/********************************************************************/

/************************* REUSABLE FUNCTIONS ***********************/
// Clears element html
function clearValues(elementID) { 
    document.getElementById(elementID).value = "";
}

// for hiding items
function hideToggle(item) {
    if (item.style.display === "none") {
        item.style.display = "block";
    } else {
        item.style.display = "none";
    }
}

// added to transaction history as they are entered
function addTransaction(table, account) { 
    let newRow = table.insertRow(2);
    let descriptionCell = newRow.insertCell(0);
        descriptionCell.innerHTML = account.allTransactions[account.allTransactions.length - 1].type;
        descriptionCell.style.textAlign = 'left';
    let amountCell = newRow.insertCell(1);
        amountCell.innerHTML = account.allTransactions[account.allTransactions.length - 1].amount;
    let balanceCell = newRow.insertCell(2);
        balanceCell.innerHTML = account.balance;

    if (descriptionCell.innerHTML === 'Deposit') {
        amountCell.style.color = '#008140';
    } else if (descriptionCell.innerHTML === 'Withdraw') {
        amountCell.style.color = 'red';
    }
}
/********************************************************************/


let account = {
    balance: 0,
    allTransactions: [],
    deposit: function (amount) {
        this.balance += amount;
        this.allTransactions.push({
            type: "Deposit",
            amount: amount,
        })
    },
    withdraw: function (amount) {
        this.balance -= amount;
        this.allTransactions.push({
            type: "Withdraw",
            amount: amount,
        })
    },   
}


// executes depending on transaction type selected
function checkTransaction() {
    if (transactionType.value === "Deposit") {
        depositFunction();
        transactionAmount.value = "";
    } else if (transactionType.value === "Withdraw") {
        withdrawFunction();
        transactionAmount.value = "";
    }
}


function depositFunction() {
    let depositValue = Number.parseFloat(transactionAmount.value);
    if (isNaN(depositValue)) {
        alert("Please enter an amount.");
        } else if (depositValue <= 0) {
            alert("Please enter a positive number.")
        } else {
            account.deposit(depositValue);
            displayValues();
            addTransaction(transactionTable, account);
        } 
}


function withdrawFunction() {
    let withdrawnValue = Number.parseFloat(transactionAmount.value);

    if (isNaN(withdrawnValue)) {
        alert("Please enter an amount.");
        } else if (withdrawnValue <= 0) {
            alert("Please enter a positive number.");
        } else {
            if (account.balance >= withdrawnValue) {
                account.withdraw(withdrawnValue);
                displayValues();
                addTransaction(transactionTable, account);
            } else {
                alert("Not enough funds for transaction.")
            }
    }  
}



// to hide customer info
function toggleCustomerAccount() {
    hideToggle(customerAccount);
}

toggleCustomerAccount(); // to hide customer info on load


// to display updated values
function displayValues () { 
    accountName.textContent = newUser.value.toUpperCase();
    currentBalance.textContent = account.balance;
}

// for execution on click (registrationBtn)
function displayCustomerAccount () {
    clearValues("registration");
    displayValues(); 
}

// for execution on click (logoutBtn)
function logoutFunction () {
    customerAccount.style.display ='none';
    registration.style.display = 'block';
}




