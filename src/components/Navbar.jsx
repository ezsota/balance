import { NavLink } from "react-router-dom";
import iconImg from "../assets/icon.svg";

export default function Navbar() {
    return (
        <div className="d-flex flex-column h-100">
            <div className="
            font-white
            d-flex flex-row align-items-center 
            px-2 py-3
            ">
                <img src={iconImg} alt="Icon of a scale" id="main-icon" />
                <p className="roboto-condensed-bold mb-0 ms-2 fs-5">BALANCE</p>
            </div>
            <div className="bg-ink flex-fill">
                <nav className="nav d-flex flex-row flex-md-column gap-0 gap-md-5 my-md-4">
                    <NavLink className="nav-link" to="/">Overview</NavLink>
                    <NavLink className="nav-link" to="/transactions-view">Transactions</NavLink>
                    <NavLink className="nav-link" to="/reports-view">Reports</NavLink>
                </nav>

            </div>
        </div>
    )
};