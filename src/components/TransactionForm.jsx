import { useState } from "react";

export default function TransactionForm(props) {
    const [displayAmount, setDisplayAmount] = useState("");
    const [numericAmount, setNumericAmount] = useState(0);
    console.log('Frontend amount:', displayAmount);
    console.log('Backend amount:', numericAmount);

    // Category Object for form dropdown
    const CATEGORY_GROUPS = {
        Financial: [
            "Business",
            "Insurance",
            "Payments",
            "Savings"
        ],
        Living: [
            "Childcare",
            "Clothing",
            "Education",
            "Food",
            "Housing",
            "Transportation",
            "Utilities"
        ],
        Leisure: [
            "Entertainment",
            "Occasions",
            "Recreation",
            "Social",
            "Vacations"
        ],
        Other: [
            "Gifts",
            "Memberships",
            "Pets",
            "Seasonal",
            "Subscriptions"
        ]
    };

    return (
        <form className="row gap-3 justify-content-center text-start mx-auto h-100">

            {/* ROW-1 */}
            <div className="row col-12 justify-content-center">
                {/* DATE */}
                <div className="col-12 col-md-6">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                        type="text" id="date"
                        className="form-control px-1 text-center"
                        placeholder="MM/DD/YY"
                        required />
                </div>
            </div>

            {/* ROW-2 */}
            <div className="row col-12 justify-content-center">
                {/* TITLE */}
                <div className="col-12 col-md-6">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" id="title" className="form-control text-center" placeholder='Ex: "October Rent"' required />
                </div>
            </div>

            {/* ROW-3 */}
            <div className="row col-12 justify-content-center">
                {/* CATEGORY */}
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

            {/* ROW-4 */}
            <div className="row col-12 justify-content-center">
                {/* AMOUNT */}
                <div className="col-12 col-md-6">
                    <label htmlFor="amount" className="form-label">Amount</label>
                    <input
                        required
                        id="amount"
                        type="text"
                        className="form-control text-center"
                        placeholder='Ex: "-1,000.50" OR "1,000.50"'
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

            {/* BOTTOM ROW */}
            <div className="col-12 text-center">
                {/* SUBMIT */}
                <button type="submit" className="btn btn-success bg-green w-100">Add Transaction</button>
            </div>

        </form>
    )
};