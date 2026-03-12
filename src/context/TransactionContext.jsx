import { useState, useEffect, createContext, useContext } from "react";
import { getTransactions } from "../api/backendApi.js";

// Init context()
const TransactionContext = createContext();

export function TransactionContextProvider({ children }) {
    // Context transaction state (will be used globally)
    const [transactions, setTransactions] = useState([]);

    // Async set context state to transaction data + error handling
    async function loadTransactions() {
        try {
            const data = await getTransactions();
            setTransactions(data);
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
                transactions,
                setTransactions,
                refreshTransactions: loadTransactions
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
}

// Export context for global component access
export function useTransactionContext() {
    return useContext(TransactionContext);
}