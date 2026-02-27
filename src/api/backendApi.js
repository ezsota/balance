const API_URL = import.meta.env.VITE_API_URL;

export async function getTransaction() {
    const response = await fetch(`${API_URL}/api/transactions`);
    if (!response.ok) throw new Error("Failed to fetch transactions");
    return response.json();
}

export async function createTransaction(transaction) {
    const response = await fetch(`${API_URL}/api/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction)
    });

    if (!res.ok) throw new Error("Failed to create transaction");
    return res.json();
}

export async function deleteTransaction(id) {
    const response = await fetch(`${API_URL}/api/transactions/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) throw new Error("Failed to delete transaction");
}

export async function editTransaction(id, updates) {
    const response = await fetch(`${API_URL}/api/transactions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
    });

    if (!res.ok) throw new Error("Failed to update transaction");
    return response.json();
}

export async function uploadExcel(file) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_URL}/api/transactions/upload`, {
        method: "POST",
        body: formData
    });

    if (!res.ok) throw new Error("Failed to upload file");
    return res.json();
}