import { Route, Routes } from "react-router-dom";
// Layouts:
import DashboardLayout from "./layouts/DashboardLayout";
// Pages:
import Overview from "./pages/Overview.jsx";
import Transactions from "./pages/Transactions.jsx";
import Reports from "./pages/Reports.jsx";
import Errors from "./pages/Errors.jsx";

export default function App() {
  return (
    <Routes>
      {/* App Pages */}
      <Route element={<DashboardLayout />}>
        <Route index element={<Overview />} />
        <Route path="/transactions-view" element={<Transactions />} />
        <Route path="/reports-view" element={<Reports />} />
        {/* Error Page */}
        <Route path="*" element={<Errors />} />
      </Route>
    </Routes>
  )
}