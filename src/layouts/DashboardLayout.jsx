import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function DashboardLayout() {
    return (
        <div className="container-fluid d-flex flex-column flex-md-row p-0 m-0 vh-100">
            <div className="
            sidebar
            bg-green 
            col-12 col-md-2
            d-flex flex-column
            ">
                <Navbar />
            </div>
            <main className="
            col-12 col-md-10
            d-flex flex-column flex-fill
            ">
                <div className="d-flex flex-column h-100 px-3 py-4 align-items-center">
                    <Outlet />
                </div>
                <Footer />
            </main>
        </div>
    )
};