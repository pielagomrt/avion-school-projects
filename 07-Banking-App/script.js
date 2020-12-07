/************************* ACCESSING HTML *************************/
let accountName = document.querySelector('#display-name');
let currentBalance = document.querySelector("#bal-end-val");
let customerAccount = document.querySelector('#customer-account');
let logoutBtn = document.querySelector('#logout');
let newUser = document.querySelector('#customer-name');
let newUserPassword = document.querySelector('#password');
let newUserConfirmPassword = document.querySelector('#confirm-password');
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
registrationBtn.addEventListener("click", registerHere);
submitBtn.addEventListener("click", () => { checkTransaction(); });
submitBtn.addEventListener("click", submitHere);
logoutBtn.addEventListener('click', logoutFunction);
/********************************************************************/


/********************************************************************/
/***************************** DISPLAY ******************************/

/************************** REUSABLE FUNCTIONS **********************/
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
                alert("Not enough funds for the transaction.")
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
    newUser.value = '';
    newUserPassword.value = '';
    newUserConfirmPassword.value = '';
}

/********************************************************************/
/************************* REQUIRED FUNCTIONS ***********************/

let accountHolders = [];

let User = function (name, password) {
    this.name = name;
    this.password = password;
    this.amount = 0;
    this.depositThis = function (amount) {
        this.amount += amount;
    }
    this.withdrawThis = function (amount) {
        this.amount -= amount;
    };
};

/*------------------------create_user (user)------------------------*/
function createUser (name, password) {
    let user = accountHolders.some(u => u.name == name);
    if (user === true) {
        console.log('%c User already exists! ', 'background: red; color: yellow')
    } else {
        let createNewUser = new User(name, password);
        accountHolders.push(createNewUser);
    }
};

function registerHere () {
    let letters = /^[A-Za-z]+$/;
    if(newUser.value.match(letters)) {
        createUser(newUser.value, newUserPassword.value);
    } else {
        alert('Please enter alphabet characters only');
        console.log('%c WRONG ARGUMENTS! ', 'color: red; font-weight: bold');
        customerAccount.style.display = 'none';
        registration.style.display ="block";
    }
 }

// validation
function userExists(name) {
    let user = accountHolders.some(u => u.name == name);
    if (user === true) {
        console.log('%c User already exists! ', 'background: red; color: yellow')
    } else {
        console.log('%c User does not exist! ', 'background: yellow; color: red')
    }
};


/*------------deposit (user, amount) / withdraw (user, amount)-----------*/
function deposit(name, amount) {
    let user = accountHolders.find(u => u.name === name);
    user.depositThis(amount);
    return user.amount
}

function withdraw(name, amount) {
    let user = accountHolders.find(u => u.name === name);
    user.withdrawThis(amount);
    return user.amount
}

function submitHere () {
     if (transactionType.value === "Deposit") {
        deposit(newUser.value, account.allTransactions[account.allTransactions.length - 1].amount);
    } else if (transactionType.value === "Withdraw") {
        withdraw(newUser.value, account.allTransactions[account.allTransactions.length - 1].amount);
    } 
}

/*------------------send (from_user, to_user, amount)--------------------*/
function send (from_name, to_name, amount) {
    let sender = accountHolders.find(u => u.name === from_name);
    let senderExists = accountHolders.some(u => u.name === from_name);
    let receiver = accountHolders.find(u => u.name === to_name);
    let receiverExists = accountHolders.some(u => u.name === to_name);


    if (senderExists === true && receiverExists === true) {
        sender.withdrawThis(amount);
        receiver.depositThis(amount);
    } else if (senderExists === false && receiverExists === true) { 
        console.log('%c SENDER does not exist!', 'color: red')
    } else if (receiverExists === false && senderExists === true) {
        console.log('%c RECEIVER does not exist!', 'color: red')
    } 
}

/*-------------------------get_balance (user)-----------------------------*/
function getBalance (name) {
    let user = accountHolders.find(u => u.name === name);
    return user.amount;
}


console.log(accountHolders);

/*********************** VALIDATION ****************************/


// function enterPassword () {
//     if (newUserPassword.value.length <=0) {
//         alert('Please enter your password.')
//         console.log('wrong_arguments')
//         customerAccount.style.display = 'none';
//         registration.style.display ="block";
//     } else if (newUserConfirmPassword.value !== newUserPassword.value) {
//         alert('Passwords are not matching.')
//         console.log('wrong_arguments')
//         customerAccount.style.display = 'none';
//         registration.style.display ="block";
//     } else {
//         customerAccount.style.display = 'block';
//         registration.style.display ="none";
//     }
// }

