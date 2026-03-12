import { formatCurrencyUSD } from "../helpers/formatUSD.js";

export default function ExpenseCard(props) {
    // Get transactions lt 0 and add those together
    const calcExpenses = (transactions) => {
        const totalExpenses = transactions
            .filter(transaction => transaction.amount < 0)
            .reduce((sum, expense) => sum + expense.amount, 0);

        return formatCurrencyUSD(totalExpenses);
    };

    return (
        <div className="col-12 col-md-4 overview-cards-container">
            <article className="card overview-cards overview-card-sm shadow mx-auto report-card">
                <header className="card-header">Expenses</header>
                <div className="card-body">
                    <p className="card-text" style={{ color: "red" }}>{calcExpenses(props.transactions)}</p>
                </div>
            </article>
        </div>
    )
};