import { Route, Routes } from "react-router-dom";
// Layouts:
import DashboardLayout from "./layouts/DashboardLayout";
// Pages:
import Overview from "./pages/Overview.jsx";
import Transactions from "./pages/Transactions.jsx";
import Reports from "./pages/Reports.jsx";
import Goals from "./pages/Goals.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="/transactions-view" element={<Transactions />} />
        <Route path="/reports-view" element={<Reports />} />
        <Route path="/goals-view" element={<Goals />} />
      </Route>
    </Routes>
  )
}