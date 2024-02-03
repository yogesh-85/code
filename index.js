

const expenseForm =
    document.getElementById("expense-form");
const expenseList =
    document.getElementById("expense-list");
const totalAmountElement =
    document.getElementById("total-amount");


let expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];


function renderExpenses() {


    expenseList.innerHTML = "";


    let totalAmount = 0;


    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        const expenseRow = document.createElement("tr");
        expenseRow.innerHTML = ` 
	<td>${expense.name}</td> 
	<td>$${expense.amount}</td>
    <td>${expense.description}</td>
    <td>${expense.category}</td>
	<td class="delete-btn" data-id="${i}" >Delete</td>
    <td class="edit-btn"  data-id="${i}">Edit</td>
	`;
        expenseList.appendChild(expenseRow);


        totalAmount += expense.amount;
    }


    totalAmountElement.textContent =
        totalAmount.toFixed(2);


    localStorage.setItem("expenses",
        JSON.stringify(expenses));
}


function addExpense(event) {
    event.preventDefault();


    const expenseNameInput =
        document.getElementById("expense-name");
    const expenseAmountInput =
        document.getElementById("expense-amount");
    const expensedescriptionInput = document.getElementById("expense-description");
    const expenseCategoryInput = document.getElementById("expense-category");

    const expenseName = expenseNameInput.value;
    const expenseAmount = parseFloat(expenseAmountInput.value);
    const expenseDescription = expensedescriptionInput.value;
    const expenseCategory = expenseCategoryInput.value;


    expenseNameInput.value = "";
    expenseAmountInput.value = "";
    expensedescriptionInput.value = "";
    expenseCategoryInput.value = "";


    if (expenseName === "" || isNaN(expenseAmount) || expenseDescription === "" || expenseCategory === "") {
        alert("Please enter valid expense details.");
        return;
    }


    const expense = {
        name: expenseName,
        amount: expenseAmount,
        description: expenseDescription,
        category: expenseCategory
    };


    expenses.push(expense);


    renderExpenses();
}


function deleteExpense(event) {
    if (event.target.classList.contains("delete-btn")) {

        // Get expense index from data-id attribute 
        const expenseIndex =
            parseInt(event.target.getAttribute("data-id"));


        expenses.splice(expenseIndex, 1);


        renderExpenses();
    }
}
function editExpense(event) {
    if (event.target.classList.contains("edit-btn")) {
        expenseList.contentEditable = true

    }
}


expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", deleteExpense);
expenseList.addEventListener("click", editExpense)

renderExpenses();
