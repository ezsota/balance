export async function apiCaller(apiFunction, navigate) {
    try {
        return await apiFunction();
    } catch (error) {
        console.error(error);
        navigate("/error", {state: error.message || "Something went wrong."});
        throw error;
    }
};