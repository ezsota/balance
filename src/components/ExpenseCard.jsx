import { calcExpenses } from "../helpers/calculateCards.js";

export default function ExpenseCard(props) {
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