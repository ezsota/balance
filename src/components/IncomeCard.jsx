import { calcIncome } from "../helpers/calculateCards.js";

export default function IncomeCard(props) {
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