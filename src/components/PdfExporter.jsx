export default function PdfExporter({ reportRef }) {

   function handlePrint() {

   };

    return (
        <button
            className="btn btn-success bg-green w-100 mt-4 mt-md-2"
            onClick={handlePrint}
        >
            Export to PDF
        </button>
    );
}