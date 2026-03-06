import { useLocation } from "react-router-dom";
import errorsIcon from "../assets/errors-icon.svg";

export default function Errors() {
    // Get error message state
    const { state } = useLocation();

    return (
        <section className="h-100 d-flex flex-column justify-content-center align-items-center">
            <img src={errorsIcon} style={{width: "50px"}} alt="Error icon" />
            <h1>{state || "Something went wrong."}</h1>
        </section>
    )
};