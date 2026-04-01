// React ChartJS demo: https://github.com/reactchartjs/react-chartjs-2/blob/master/sandboxes/line/area/App.tsx
import { useMemo } from "react";
import { formatCurrencyUSD } from "../helpers/formatUSD";
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

export default function AreaChart(props) {
    // Sort and memoize by date, avoids canvas recalc/render errors
    const dateSorted = useMemo(() =>
        [...props.transactions].sort((a, b) => new Date(a.date) - new Date(b.date)),
        [props.transactions]
    );

    // Create date strings for x-axis (using dateSorted)
    const labels = dateSorted.map(transaction => transaction.date);
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
                backgroundColor: 'rgba(77, 222, 108, 0.65)', // Area color
                borderColor: 'rgb(124, 147, 147)', // Line color
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    title: function (tooltipItems) {
                        const index = tooltipItems[0].dataIndex;
                        return dateSorted[index].title;
                    },
                    label: function (tooltipItem) {
                        const index = tooltipItem.dataIndex;

                        const amount = dateSorted[index].amount;
                        const balance = tooltipItem.dataset.data[index];

                        return [
                            `Amount: ${formatCurrencyUSD(amount)}`,
                            `Balance: ${formatCurrencyUSD(balance)}`
                        ];
                    }
                }
            }
        }
    };

    return (
        <section className="border rounded shadow text-center my-2 mb-md-4 mx-auto" id="overview-chart">
            {/* CHART RENDER */}
            <Line data={data} options={chartOptions} />
        </section>
    )
};