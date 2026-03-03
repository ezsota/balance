// React ChartJS Dougnut demo: https://react-chartjs-2.js.org/examples/doughnut-chart

import { useMemo } from "react";
// Doughnut chart library and components
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";
// Register chart components for use
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart(props) {
    // Get unique categories
    const labels = Array.from(new Set(
        props.transactions.map(transaction => transaction.category)
    ));

    // Category count obj container
    const categoryCounts = {};
    // Count each category occurrence
    props.transactions.forEach(transaction => {
        const category = transaction.category;
        if (categoryCounts[category]) {
            // Increment category count if exists
            categoryCounts[category]++;
        } else {
            // Init category count if new
            categoryCounts[category] = 1;
        }
    });

    // Create dataPoints array for chart data
    const dataPoints = labels.map(category => categoryCounts[category] || 0);

    // Chart data configuration
    const data = {
        labels,
        datasets: [
            {
                label: "Category Count",
                data: dataPoints,
                borderWidth: 2,
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
        <section className="border rounded shadow p-2 text-center my-2 mb-md-4 mx-auto" id="overview-chart">
            {/* CHART RENDER */}
            <Doughnut data={data} options={chartOptions} />
        </section>
    )
};