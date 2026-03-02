export default function IncomeCard(props) {
    return (
        <div className="col-12 col-md-4 mx-auto py-2">
            <article className="card overview-cards overview-card-sm shadow mx-auto">
                <header className="card-header">Income</header>
                <div className="card-body">
                    <p className="card-text" style={{ color: "green" }}>{props.formatCurrencyUSD(props.income)}</p>
                </div>
            </article>
        </div>
    )
};