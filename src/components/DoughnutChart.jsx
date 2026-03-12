// React ChartJS Dougnut demo: https://react-chartjs-2.js.org/examples/doughnut-chart
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

    // Calculate total transactions
    const totalCount = Object.values(categoryCounts).reduce((sum, count) => sum + count, 0);

    // Calculate percentages and labels
    const labels = Object.keys(categoryCounts).map(category => {
        const percent = Math.round((categoryCounts[category] / totalCount) * 100);
        return `${category} (${percent}%)`; // label format
    });

    // Create dataPoints array for chart data using percentages
    const dataPoints = Object.values(categoryCounts).map(count => Math.round((count / totalCount) * 100));

    // Gnerate fill colors, with color difference
    function generateColors(categoryCount) {
        const backgroundColors = [];

        for (let i = 0; i < categoryCount; i++) {
            const r = (i * 40) % 256;
            const g = (i * 80) % 256;
            const b = (i * 120) % 256;
            backgroundColors.push(`rgba(${r}, ${g}, ${b}, 1)`);
        }

        return { backgroundColors };
    };
    // Assign generated fill colors
    const { backgroundColors } = generateColors(dataPoints.length);

    // Chart data configuration
    const data = {
        labels,
        datasets: [
            {
                label: "Percentage",
                data: dataPoints,
                borderWidth: 2,
                backgroundColor: backgroundColors, // Fill color
                borderColor: `rgb(255, 255, 255)`, // Line color
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