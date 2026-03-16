const API_URL = import.meta.env.VITE_API_URL;

// Get ALL transaction data, if there is a filter then get FILTERED
/*	FilterBox.js receives dates from user input -> 
    FilterBox onSubmit setFilters in parent -> 
    Parent component init getTransactions(filters) -> 
    api/backendApi.js returns filtered transactions-> 
    Parent component updates state to filtered transactions */
export async function getTransactions(filters = {}) {
    const params = new URLSearchParams({
        from: filters.from ? new Date(filters.from).toISOString() : undefined,
        to: filters.to ? new Date(filters.to).toISOString() : undefined
    });
    const response = await fetch(`${API_URL}/api/transactions?${params}`);
    // get JSON response or backend error message
    const data = await response.json();
    // throw backend error message
    if (response.status === 429) {
        throw new Error("Request limit reached, please try again later.");
    } else if (!response.ok) {
        throw new Error(data.message || "Failed to retieve all transactions");
    }
    // return JSON response with formatted dates
    const formattedData = data.map(transaction => ({
        ...transaction,
        date: new Date(transaction.date).toISOString().split("T")[0]
    }));

    return formattedData;
}

export async function createTransaction(transaction) {
    const response = await fetch(`${API_URL}/api/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction)
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to create transaction");
    }
    return data;
}

export async function deleteTransaction(id) {
    const response = await fetch(`${API_URL}/api/transactions/${id}`, {
        method: "DELETE"
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to delete transaction");
    }
    return data;
}

export async function editTransaction(id, updates) {
    const response = await fetch(`${API_URL}/api/transactions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to update transaction");
    }
    return data;
}

export async function uploadExcel(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/api/transactions/upload`, {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.message || "Failed to upload file");
    }
    return data;
}