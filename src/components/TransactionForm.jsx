import { useState } from "react";
import { CATEGORY_GROUPS } from "../helpers/categoryGroups.js";

export default function TransactionForm(props) {
    // Amount state for frontend display
    const [displayAmount, setDisplayAmount] = useState("");
    // ** TESTING **
    console.log('Frontend amount:', displayAmount);
    // Amount state for backend server (sent via form onSubmit)
    const [numericAmount, setNumericAmount] = useState(0);
    // ** TESTING **
    console.log('Backend amount:', numericAmount);

    return (
        <form
            className="row gap-3 justify-content-center text-start mx-auto h-100"
            onSubmit={(event) => {
                event.preventDefault();
                // Obj for backend
                const formData = {
                    title: event.target.title.value,
                    amount: numericAmount,
                    category: event.target.category.value,
                    date: event.target.date.value
                };
                // ** TESTING **
                console.log("POST TEST", formData);
                
                // backend HTTP POST req
                props.createTransaction(formData);

                // Clear form DOM inputs
                event.target.reset();
                // Reset amount states
                setDisplayAmount("");
                setNumericAmount(0);
            }}
        >
            {/* ROW-1 DATE */}
            <div className="row col-12 justify-content-center">
                <div className="col-12 col-md-6">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                        type="date" id="date"
                        className="form-control px-1 text-center"
                        required />
                </div>
            </div>
            {/* ROW-2 TITLE */}
            <div className="row col-12 justify-content-center">
                <div className="col-12 col-md-6">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" id="title" className="form-control text-center" placeholder='Ex: "October Rent"' required />
                </div>
            </div>
            {/* ROW-3 CATEGORY */}
            <div className="row col-12 justify-content-center">
                <div className="col-12 col-md-6">
                    <label htmlFor="category" className="form-label">Category</label>
                    <select
                        id="category"
                        className="form-select text-center"
                        defaultValue=""
                        required>
                        <option value="" disabled>
                            Select a Category
                        </option>
                        {Object.entries(CATEGORY_GROUPS).map(([groupName, categories]) => (
                            <optgroup key={groupName} label={groupName}>
                                {categories.map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
            </div>
            {/* ROW-4 AMOUNT */}
            <div className="row col-12 justify-content-center">
                <div className="col-12 col-md-6">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input
                        required
                        id="amount"
                        type="text"
                        className="form-control text-center"
                        placeholder='Ex: "-1000.50" OR "1000.50"'
                        value={displayAmount}
                        // Block "Enter" button form submission:
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                            }
                        }}
                        // While user types:
                        onChange={(event) => {
                            // Get raw amount value
                            const rawValue = event.target.value
                            // Remove commas (avoids parsing bugs)
                            const strippedValue = rawValue.replace(/,/g, "");
                            // Remove non monetary characters (avoids bugs)
                            const validValue = strippedValue.replace(/[^0-9.-]/g, "");
                            // Store display value (for frontend)
                            setDisplayAmount(validValue);
                            // Store calc value (for backend)
                            const calcValue = Number(validValue);
                            setNumericAmount(Number.isNaN(calcValue) ? 0 : calcValue);
                        }}
                        // When user leaves input:
                        onBlur={() => {
                            // Verify and format amount display
                            if (displayAmount === "" || isNaN(numericAmount)) {
                                return;
                            } else {
                                setDisplayAmount(
                                    numericAmount.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })
                                );
                            }
                        }}
                    />
                </div>
            </div>
            {/* BOTTOM ROW - SUBMIT */}
            <div className="col-12 text-center">
                <button type="submit" className="btn btn-success bg-green w-100">Add Transaction</button>
            </div>
        </form>
    )
};