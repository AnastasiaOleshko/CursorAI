// Store expenses in an array
let expenses = [];

// Function to add a new expense
function addExpense() {
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (category && amount) {
        expenses.push({ category, amount });
        updateExpensesTable();
        clearForm();
    } else {
        alert('Please fill in both category and amount!');
    }
}

// Function to clear the form
function clearForm() {
    document.getElementById('category').value = '';
    document.getElementById('amount').value = '';
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    updateExpensesTable();
}

// Function to update the expenses table
function updateExpensesTable() {
    const tbody = document.getElementById('expensesList');
    tbody.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>$${expense.amount.toLocaleString()}</td>
            <td><button class="delete-btn" onclick="deleteExpense(${index})">Delete</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Function to calculate and display expense statistics
function calculateExpenses() {
    if (expenses.length === 0) {
        alert('Please add some expenses first!');
        return;
    }

    // Calculate total expenses
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('totalExpenses').textContent = `$${total.toLocaleString()}`;

    // Calculate average daily expense (assuming 30 days)
    const averageDaily = total / 30;
    document.getElementById('averageExpense').textContent = `$${averageDaily.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;

    // Find top 3 expenses
    const sortedExpenses = [...expenses].sort((a, b) => b.amount - a.amount);
    const topExpensesList = document.getElementById('topExpenses');
    topExpensesList.innerHTML = '';

    for (let i = 0; i < Math.min(3, sortedExpenses.length); i++) {
        const expense = sortedExpenses[i];
        const li = document.createElement('li');
        li.textContent = `${expense.category}: $${expense.amount.toLocaleString()}`;
        topExpensesList.appendChild(li);
    }

    // Fill remaining slots if less than 3 expenses
    for (let i = sortedExpenses.length; i < 3; i++) {
        const li = document.createElement('li');
        li.textContent = '-';
        topExpensesList.appendChild(li);
    }
} 