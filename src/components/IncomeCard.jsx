import { formatCurrencyUSD } from "../helpers/formatUSD.js";

export default function IncomeCard(props) {

    // Get transactions gt 0 and add those together
    const calcIncome = (transactions) => {
        const totalIncome = transactions
            .filter(transaction => transaction.amount > 0)
            .reduce((sum, income) => sum + income.amount, 0);

        return formatCurrencyUSD(totalIncome);
    };


    return (
        <div className="col-12 col-md-4 overview-cards-container">
            <article className="card overview-cards overview-card-sm shadow mx-auto report-card">
                <header className="card-header">Income</header>
                <div className="card-body">
                    <p className="card-text" style={{ color: "green" }}>{calcIncome(props.transactions)}</p>
                </div>
            </article>
        </div>
    )
};