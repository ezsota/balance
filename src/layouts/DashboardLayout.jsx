import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function DashboardLayout() {
    return (
        <div className="container-fluid row p-0 m-0 vh-100">
            <nav className="
            nav 
            bg-green 
            col-12 col-md-2 
            d-flex flex-column
            ">
                <Navbar />
            </nav>
            <main className="
            col-12 col-md-10 
            d-flex flex-column flex-fill
            ">
                <Outlet />
                <footer>
                    <Footer />
                </footer>
            </main>
        </div>
    )
};