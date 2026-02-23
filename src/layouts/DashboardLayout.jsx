import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

export default function DashboardLayout() {
    return (
        <div>
            <nav>
                <Navbar />
            </nav>
            <main>
                <Outlet />
                <footer>
                    <Footer />
                </footer>
            </main>
        </div>
    )
};