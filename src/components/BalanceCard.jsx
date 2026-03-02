export default function BalanceCard(props) {
    return (
        <div className="col-12 col-md-4 py-2 report-card">
            <article className="card overview-cards overview-card-sm shadow mx-auto">
                <header className="card-header">Balance</header>
                <div className="card-body">
                    <p className="card-text">{props.formatCurrencyUSD(props.balance)}</p>
                </div>
            </article>
        </div>
    )
}