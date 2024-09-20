let transactions = [];
const transactionList = document.getElementById("transaction-list");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const balance = document.getElementById("balance");
const addBtn = document.getElementById("add-btn");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");


addBtn.addEventListener("click", function () {
  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const type = typeSelect.value;

  if (description && !isNaN(amount)) {
    const transaction = {
      id: Date.now(),
      description: description,
      amount: amount,
      type: type,
    };
    transactions.push(transaction);
    updateUI();
    clearInputs();
  }
});


function updateUI() {
  transactionList.innerHTML = "";
  let incomeTotal = 0;
  let expenseTotal = 0;

  transactions.forEach((transaction) => {
    const li = document.createElement("li");
    li.classList.add(
      "flex",
      "justify-between",
      "p-3",
      "rounded-lg",
      transaction.type === "income" ? "bg-green-100" : "bg-red-100"
    );
    li.innerHTML = `
            <span>${transaction.description} - $${transaction.amount.toFixed(
      2
    )}</span>
            <div class="flex gap-2">
                <button onclick="editTransaction(${
                  transaction.id
                })" class="text-orange-500 hover:text-orange-600">Edit</button>
                <button onclick="deleteTransaction(${
                  transaction.id
                })" class="text-red-600 hover:text-red-700">Delete</button>
            </div>
        `;
    transactionList.appendChild(li);

    if (transaction.type === "income") {
      incomeTotal += transaction.amount;
    } else {
      expenseTotal += transaction.amount;
    }
  });

  totalIncome.innerText = `$${incomeTotal.toFixed(2)}`;
  totalExpense.innerText = `$${expenseTotal.toFixed(2)}`;
  balance.innerText = `$${(incomeTotal - expenseTotal).toFixed(2)}`;
}


function clearInputs() {
  descriptionInput.value = "";
  amountInput.value = "";
}


function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateUI();
}


function editTransaction(id) {
  const transaction = transactions.find((transaction) => transaction.id === id);
  descriptionInput.value = transaction.description;
  amountInput.value = transaction.amount;
  typeSelect.value = transaction.type;

  deleteTransaction(id);
}
