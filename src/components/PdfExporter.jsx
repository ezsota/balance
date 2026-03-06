import ReactPDF from '@react-pdf/renderer';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

export default function PdfExporter(props) {
    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                {Reports}
            </Page>
        </Document>
    );

    function handleClick() {
        console.log('Saving to PDF');
        ReactPDF.render(<MyDocument />, `/reports-view`);
    }

    return (
        <button className="btn btn-success bg-green w-100 mt-4 mt-md-2" onClick={handleClick}>
            Export to PDF
        </button>
    )
};