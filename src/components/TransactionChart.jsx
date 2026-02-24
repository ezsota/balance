import placeholderChart from "../assets/chart-placeholder.svg"

export default function TransactionChart() {
    return (
        <section className="border rounded text-center my-2 my-md-4 mx-auto">
            <img src={placeholderChart} id="overview-chart" alt="placeholder image of a chart" />
        </section>
    )
};