// Format amounts to USD function
export function formatCurrencyUSD(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

// Get transactions gt 0 and add those together
export const calcIncome = (transactions) => {
    const totalIncome = transactions
        .filter(transaction => transaction.amount > 0)
        .reduce((sum, income) => sum + income.amount, 0);

    return formatCurrencyUSD(totalIncome);
};

// Get transactions lt 0 and add those together
export const calcExpenses = (transactions) => {
    const totalExpenses = transactions
        .filter(transaction => transaction.amount < 0)
        .reduce((sum, expense) => sum + expense.amount, 0);

    return formatCurrencyUSD(totalExpenses);
};

// Get the the total balance
export const calcBalance = (transactions) => {
    const totalBalance = transactions.reduce((sum, expense) => sum + expense.amount, 0);

    return formatCurrencyUSD(totalBalance);
};