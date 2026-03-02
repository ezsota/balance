import IncomeCard from "./IncomeCard.jsx";
import ExpenseCard from "./ExpenseCard.jsx";
import BalanceCard from "./BalanceCard.jsx";

export default function SummaryCards(props) {
    // Format amounts function
    function formatCurrencyUSD(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    // Get transactions gt 0 and add those together
    const income = props.transactions
        .filter(transaction => transaction.amount > 0)
        .reduce((sum, income) => sum + income.amount, 0);

    // Get transactions lt 0 and add those together
    const expenses = props.transactions
        .filter(transaction => transaction.amount < 0)
        .reduce((sum, expense) => sum + expense.amount, 0);

    // Get the account balance
    const balance = income + expenses;

    return (
        <>
            <IncomeCard income={income} formatCurrencyUSD={formatCurrencyUSD} />
            <ExpenseCard expenses={expenses} formatCurrencyUSD={formatCurrencyUSD} />
            <BalanceCard balance={balance} formatCurrencyUSD={formatCurrencyUSD} />
        </>
    )
};