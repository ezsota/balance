const API_URL = import.meta.env.VITE_API_URL;

// Get ALL transaction data, if there is a filter then get FILTERED
export async function getTransactions(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/api/transactions?${params}`);
    if (!response.ok) throw new Error("Failed to fetch all transactions");
    return response.json();
}

export async function createTransaction(transaction) {
    const response = await fetch(`${API_URL}/api/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction)
    });

    if (!response.ok) throw new Error(`Failed to create ${transaction}`);
    return response.json();
}

export async function deleteTransaction(id) {
    const response = await fetch(`${API_URL}/api/transactions/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) throw new Error(`Failed to delete transaction ${id}`);
}

export async function editTransaction(id, updates) {
    const response = await fetch(`${API_URL}/api/transactions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
    });

    if (!response.ok) throw new Error(`Failed to update transaction ${id}`);
    return response.json();
}

export async function uploadExcel(file) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/api/transactions/upload`, {
        method: "POST",
        body: formData
    });

    if (!response.ok) throw new Error("Failed to upload file");
    return response.json();
}