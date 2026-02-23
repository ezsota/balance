import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function DashboardLayout() {
    return (
        <div className="container-fluid row p-0 m-0 vh-100">
            <div className="
            nav
            bg-green 
            col-12 col-md-2
            d-flex flex-column
            p-0
            ">
                <Navbar />
            </div>
            <main className="
            col-12 col-md-10 
            d-flex flex-column flex-fill
            p-2
            ">
                <Outlet />
                <Footer />
            </main>
        </div>
    )
};