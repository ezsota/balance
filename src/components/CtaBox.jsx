import { useNavigate } from "react-router-dom";

export default function CtaBox() {
    // init navigation function
    const navigate = useNavigate();

    // CTA logic
    function handleCtaClick() {
        navigate("/transactions-view");
    }

    return (
        <aside className="text-center mt-3 mt-md-5">
            <h2>New Transactions?</h2>
            <p>Use the transactions tab to update your data.</p>
            <button className="btn btn-success bg-green px-5" onClick={handleCtaClick}>Add Transactions</button>
        </aside>
    )
};