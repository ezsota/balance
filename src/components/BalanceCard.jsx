import { calcBalance } from "../helpers/calculateCards.js";

export default function BalanceCard(props) {
    return (
        <div className="col-12 col-md-4 overview-cards-container">
            <article className="card overview-cards overview-card-sm shadow mx-auto report-card">
                <header className="card-header">Balance</header>
                <div className="card-body">
                    <p className="card-text">{calcBalance(props.transactions)}</p>
                </div>
            </article>
        </div>
    )
}