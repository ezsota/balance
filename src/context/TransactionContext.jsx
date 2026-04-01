import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactions } from "../api/backendApi.js";
import { apiCaller } from "../helpers/apiCaller.js";

// Init context()
const TransactionContext = createContext();

// Export context to APPLICATION via index.jsx
export function TransactionContextProvider({ children }) {
    // Context transaction state (will be used globally)
    const [transactionsData, setTransactionsData] = useState([]);
    // Loading state
    const [loadingMessage, setLoadingMessage] = useState(true);

    // Async set context state to transaction data + error handling
    const navigate = useNavigate();
    async function loadTransactions() {
        // Mount loading
        setLoadingMessage(true);

        try {
            // Get data using apiCaller with error handling
            const data = await apiCaller(getTransactions, navigate);
            if (!data) return;
            // Sort data for components -> CAUSES UNHOSTED ERROR: No data: Unexpected token '<', "<!doctype "... is not valid JSON
            const sortedData = data.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
            // Set transaction state sorted
            setTransactionsData(sortedData);

            // Unmount loading
            setLoadingMessage(false);
        } catch (error) {
            console.error("Transaction context provider failed to retrieve data", error);
        }
    }

    // Async get transaction data on render
    useEffect(() => {
        const fetchData = async () => {
            await loadTransactions();
        };

        fetchData();
    }, []);

    // Provide transaction state and async funcs to app via TransactionContext (above)
    return (
        <TransactionContext.Provider
            value={{
                transactionsData,
                setTransactionsData,
                refreshTransactions: loadTransactions,
                loadingMessage
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
}

// Export context access for global COMPONENTS
export function useTransactionContext() {
    return useContext(TransactionContext);
}