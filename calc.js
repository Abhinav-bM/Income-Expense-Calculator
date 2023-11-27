let incomeData = [];
let expenseData = [];


// Add income 
function addIncome() {
    const incomeInput = document.getElementById("incomeAmount");
    const categoryInput = document.getElementById("incomeCategory");

    const incomeInputValue = incomeInput.value;
    const categoryInputValue = categoryInput.value;

    
    if (validateInput(incomeInputValue, categoryInputValue, incomeInput, categoryInput)) {
        incomeData.push({ amount: incomeInputValue, category: categoryInputValue });
        updateIncomeTable();
        SummaryChart();

        // Clear input
        incomeInput.value = "";
        categoryInput.value = "";
    }
}

// Add expense
function addExpense() {
    const expenseInput = document.getElementById("expenseAmount");
    const categoryExInput = document.getElementById("expensecategory");

    const expenseInputValue = expenseInput.value;
    const categoryExInputValue = categoryExInput.value;

    
    if (validateInput(expenseInputValue, categoryExInputValue, expenseInput, categoryExInput)) {
        expenseData.push({ amount: expenseInputValue, category: categoryExInputValue });
        updateExpenseTable();
        SummaryChart();

        // Clear input
        expenseInput.value = "";
        categoryExInput.value = "";
    }
}

// Form validation
function validateInput(amount, category, amountInput, categoryInput) {
    const amountRegex = /^\d+(\.\d+)?$/;
    const categoryRegex =/^[A-Za-z]+$/;

    
    removeValidationStyles(amountInput);
    removeValidationStyles(categoryInput);

    
    if (!amountRegex.test(amount) || parseFloat(amount) <= 0) {
        applyValidationStyles(amountInput);
        return false;
    }

    
    if (!categoryRegex.test(category)) {
        applyValidationStyles(categoryInput);
        return false;
    }

    return true;
}


function applyValidationStyles(inputElement) {
    inputElement.style.borderColor = "red";
}


function removeValidationStyles(inputElement) {
    inputElement.style.borderColor = "";
}


function updateIncomeTable(){

    const incomeTable = document.getElementById("incomeTable");

    tableUpdate(incomeTable, incomeData);

}


function updateExpenseTable(){

    const expenseTable = document.getElementById("expenseTable");

    tableUpdate(expenseTable, expenseData);

}


// Table update
function tableUpdate(table, data){

    // clear the table
    table.innerHTML = '';


    data.forEach(function (item, index){

        const row = document.createElement("tr");

        const tableAmount = document.createElement("td");
        tableAmount.textContent = item.amount;

        const tableCategory = document.createElement("td");
        tableCategory.textContent = item.category;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove";
        deleteButton.addEventListener("click", function(){
                
            data.splice(index, 1);
            tableUpdate(table, data);
            SummaryChart();
        });

        const tableDelete = document.createElement("td");
        tableDelete.appendChild(deleteButton);

        row.appendChild(tableAmount);
        row.appendChild(tableCategory);
        row.appendChild(deleteButton);

        table.appendChild(row);

    });

}


// chart Update
function SummaryChart ( ){
    const incomeTotal = calculateTotal(incomeData);
    const expenseTotal = calculateTotal(expenseData);
    const balance = incomeTotal - expenseTotal;

    const chartcanvas = document.getElementById('summaryChart');
    const ctx = chartcanvas.getContext('2d');

    if (window.piechart) {
        window.piechart.destroy();
    }

    window.piechart = new Chart(ctx, {
        type: 'pie',
        data:{
            labels : ['Income', 'Expense', 'Balance'],
            datasets: [{
                data: [incomeTotal, expenseTotal, balance],
                backgroundColor: ['#36A2EB', '#FF6384', '#4CAF50'],
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio : false,
        }
    });
}



// total
function calculateTotal(data) {
    return data.reduce(function(total, item){
        return total + parseFloat(item.amount); 
        
    },0);
}










