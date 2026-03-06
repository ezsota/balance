import { useLocation } from "react-router-dom";

export default function Errors() {
    // Get error message state
    const { state } = useLocation();

    return (
        <h1>{state || "Something went wrong."}</h1>
    )
};