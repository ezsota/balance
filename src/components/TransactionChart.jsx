// React ChartJS demo: https://github.com/reactchartjs/react-chartjs-2/blob/master/sandboxes/line/area/App.tsx

import { useMemo } from "react";
// Line chart library and components
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from "chart.js";
// Register chart components for use
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function TransactionChart(props) {
    // Sort and memoize by date, avoids canvas recalc/render errors
    const dateSorted = useMemo(() =>
        props.transactions.sort((a, b) => new Date(a.date) - new Date(b.date)),
        [props.transactions]
    );

    // Create date strings for x-axis (using dateSorted)
    const labels = dateSorted.map(transaction => {
        return new Date(transaction.date).toLocaleDateString();
    });
    // Create amounts for y-axis (using dateSorted)
    let balanceTotal = 0;
    const dataPoints = dateSorted.map(transaction => (balanceTotal += transaction.amount));

    // Chart data configuration
    const data = {
        labels,
        datasets: [
            {
                label: "Balance History",
                data: dataPoints,
                borderWidth: 2,
                tension: 0, // Line sharpness
                fill: true, //Area chart on
                backgroundColor: 'rgba(38, 226, 226, 0.2)', // Area color
                borderColor: 'rgba(75, 192, 192, 1)', // Line color
            }
        ]
    };

    // Make chart responsive
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <section className="border rounded text-center my-2 my-md-4 mx-auto" id="overview-chart">
            {/* CHART RENDER */}
            <Line data={data} options={chartOptions} />
        </section>
    )
};