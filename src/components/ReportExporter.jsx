import html2canvas from "html2canvas";

export default function ReportExporter({ reportRef }) {
    const handleExport = async () => {
        // Fail safe if nothing
        if (!reportRef.current) return;

        // Get the reports div
        const canvas = await html2canvas(reportRef.current, {
            scale: 2, // resolution
            useCORS: true, // allows cross origin images (if any)
        });

        // Convert reports div to image for download
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "financial-report.png";
        link.click();
    };

    return (
        <button
            className="btn btn-success bg-green w-100 mt-4 mt-md-2"
            onClick={handleExport}
        >
            Export Report as Image
        </button>
    );
}