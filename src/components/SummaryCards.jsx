export default function SummaryCards() {
    return (
        // SUMMARY GRID BOX
        <section className="container text-center">
            {/* ROW 1 - BREAKDOWN*/}
            <div className="row justify-content-center">
                <div className="col-12 col-md-4">
                    <article className="card overview-cards overview-card-sm shadow mx-auto">
                        <header className="card-header">Income</header>
                        <div className="card-body">
                            <p className="card-text" style={{color: "green"}}>$320,049,048.56</p>
                        </div>
                    </article>
                </div>

                <div className="col-12 col-md-4">
                    <article className="card overview-cards overview-card-sm shadow mx-auto">
                        <header className="card-header">Expenses</header>
                        <div className="card-body">
                            <p className="card-text" style={{color: "red"}}>-$40,405,758.04</p>
                        </div>
                    </article>
                </div>
                <div className="col-12 col-md-4">
                    <article className="card overview-cards overview-card-sm shadow mx-auto">
                        <header className="card-header">Balance</header>
                        <div className="card-body">
                            <p className="card-text">$279,643,290.50</p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
};