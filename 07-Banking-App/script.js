/************************* ACCESSING HTML *************************/
let accountName = document.querySelector('#display-name');
let currentBalance = document.querySelector("#bal-end-val");
let customerAccount = document.querySelector('#customer-account');
let login = document.querySelector("#login");
let loginName = document.querySelector('#customer-name-login');
let loginPassword = document.querySelector('#password-login');
let loginLink = document.querySelector('#reg-to-login');
let loginBtn = document.querySelector("#login-btn");
let logoutBtn = document.querySelector('#logout');
let newUser = document.querySelector('#customer-name');
let newUserPassword = document.querySelector('#password');
let newUserConfirmPassword = document.querySelector('#confirm-password');
let registration = document.querySelector("#registration");
let registrationBtn = document.querySelector("#reg-btn");
let registrationLink = document.querySelector("#reg-link");
let submitBtn = document.querySelector("#submit-transaction");
let transactionAmount = document.querySelector("#transaction-amount");
let transactionTransferAlert = document.querySelector("#transaction-alert");
let transactions = document.querySelector("#transactions")
let transactionType = document.querySelector("#transaction-type")
let transferInputText = document.querySelector('#transfer-text'); 
let transactionTable = document.querySelector("#transaction-table");
/*******************************************************************/
/************************* EVENT LISTENERS *************************/
registrationLink.addEventListener("click", registerLink);
registrationBtn.addEventListener("click", registerHere);
submitBtn.addEventListener("click",transaction);
loginBtn.addEventListener("click", () => { accountLogin(loginName.value) });
loginLink.addEventListener('click', logoutFunction);
logoutBtn.addEventListener('click', logoutFunction);
transactionType.addEventListener("click", toggleTransferText);
/********************************************************************/
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
        if (this.amount >= amount) {
            this.amount -= amount;
        } else {
            console.log('Insufficient funds!')
            alert('Funds are not enough to proceed with the transaction.')
        }
    };
}
/*------------------------create_user (user)------------------------*/
function createUser (name, password) {
    let user = accountHolders.some(u => u.name == name); // "find" returns a value, "some" returns a boolean
    if (user === true) {
        console.log('%c User already exists! ', 'background: red; color: yellow')
        alert('Account is already registered.')
        customerAccount.style.display = "none";
        registration.style.display ="block";
        newUser.value ="";
        newUserPassword.value = "";
        newUserConfirmPassword.value = "";
    } else {
        let createNewUser = new User(name, password);
        accountHolders.push(createNewUser);
        alert('REGISTRATION SUCCESSFUL')
    }
};
// for creating a new account by clicking the 'register' button
function registerHere () {
    let letters = /^[A-Za-z]+$/;
    if(newUser.value.match(letters) && newUserPassword.value === newUserConfirmPassword.value && newUserPassword.value.length > 0) {
        createUser(newUser.value, newUserPassword.value);
        login.style.display = "block";
        registration.style.display = "none";
    } else {
        alert('Passwords are not matching.');
        console.log('%c WRONG ARGUMENTS! ', 'color: red; font-weight: bold');
        customerAccount.style.display = 'none';
        registration.style.display ="block";
        newUser.value ="";
        newUserPassword.value = "";
        newUserConfirmPassword.value = "";
    }
}
// to show registration div by clicking the link on the login div
function registerLink () {
    if (registration.style.display = "none") {
        registration.style.display = "block";
        customerAccount.style.display = "none";
        login.style.display = "none";
        newUser.value ="";
        newUserPassword.value = "";
        newUserConfirmPassword.value = "";
    } else {
        registration.style.display ="none";
    }
}
// for accessing an account by clicking the 'login' button
function accountLogin (name) {
    let user = accountHolders.some(u => u.name == name); 
    if (user === true) {
        customerAccount.style.display = "block";
        login.style.display = "none";
        accountName.textContent = loginName.value.toUpperCase();
        currentBalance.textContent = numberWithCommas(getBalance(loginName.value)); 
    } else {
        console.log('%c User does not exist! ', 'background: yellow; color: red')
        alert('Account not registered.');
        loginName.value = '';
        loginPassword.value = '';
    }
};
// to display the login div through either 'logout' button or 'back to login' link
function logoutFunction () {
    customerAccount.style.display ='none';
    registration.style.display = 'none';
    login.style.display = 'block';
    newUser.value = "";
    newUserPassword.value = '';
    newUserConfirmPassword.value = '';
    loginName.value = '';
    loginPassword.value = '';
}
/*------------deposit (user, amount) / withdraw (user, amount) / send (from_user, to_user, amount)-----------*/
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
function send (from_name, to_name, amount) {
    let sender = accountHolders.find(u => u.name === from_name);
    let senderExists = accountHolders.some(u => u.name === from_name);
    let receiver = accountHolders.find(u => u.name === to_name);
    let receiverExists = accountHolders.some(u => u.name === to_name);
    if (sender === receiver) {
        alert('Cannot transfer to own account');
    } else if (receiverExists === true) {
        sender.withdrawThis(amount);
        receiver.depositThis(amount);
        alert('You have successfully transferred funds to another account.')
    } else if (receiverExists === false) {
        console.log('%c RECEIVER does not exist!', 'background: white; color: red')
        alert('RECEIVER does not exist');
    } else if (senderExists === false) {
        console.log('%c SENDER does not exist!', 'background: white; color: red')
        alert('SENDER does not exist');
    }
}
// execute depending on type of transaction
function transaction () {
    if (transactionType.value === "Deposit") {
        deposit(loginName.value, Number.parseFloat(transactionAmount.value));
    } else if (transactionType.value === "Withdraw") {
        withdraw(loginName.value, Number.parseFloat(transactionAmount.value));
    } else if (transactionType.value = "Transfer") {
        send(loginName.value, transferInputText.value, Number.parseFloat(transactionAmount.value));
        transferInputText.style.display = "none"
    }
    transactionType.value = "Deposit";
    transactionAmount.value = "";
    transferInputText.value = "";
    currentBalance.textContent = numberWithCommas(getBalance(loginName.value));
}
// shows input box when 'transfer' is selected
function toggleTransferText() {
    if (transactionType.value === "Transfer") {
        transferInputText.style.display = "block";
    } else if (transactionType.value === "Withdraw") {
        transferInputText.style.display = "none";
    } else if (transactionType.value === "Deposit") {
        transferInputText.style.display = "none";
    }
}
function numberWithCommas(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
/*-------------------------get_balance (user)-----------------------------*/
function getBalance (name) {
    let user = accountHolders.find(u => u.name === name);
    return user.amount;
}
console.log(accountHolders);