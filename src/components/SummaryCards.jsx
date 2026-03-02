export default function SummaryCards(props) {
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
        // SUMMARY GRID BOX
        <section className="container text-center">
            {/* ROW 1 - BREAKDOWN */}
            <div className="row justify-content-center">
                <div className="col-12 col-md-4">
                    <article className="card overview-cards overview-card-sm shadow mx-auto">
                        <header className="card-header">Income</header>
                        <div className="card-body">
                            <p className="card-text" style={{ color: "green" }}>{income}</p>
                        </div>
                    </article>
                </div>

                <div className="col-12 col-md-4">
                    <article className="card overview-cards overview-card-sm shadow mx-auto">
                        <header className="card-header">Expenses</header>
                        <div className="card-body">
                            <p className="card-text" style={{ color: "red" }}>{expenses}</p>
                        </div>
                    </article>
                </div>
                <div className="col-12 col-md-4">
                    <article className="card overview-cards overview-card-sm shadow mx-auto">
                        <header className="card-header">Balance</header>
                        <div className="card-body">
                            <p className="card-text">{balance}</p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
};