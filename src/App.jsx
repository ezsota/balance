import { useState } from "react";
import { Route, Routes } from "react-router-dom";
// Disclaimer:
import DisclaimerModal from "./components/DisclaimerModal.jsx";
// Layouts:
import DashboardLayout from "./layouts/DashboardLayout";
// Pages:
import Overview from "./pages/Overview.jsx";
import Transactions from "./pages/Transactions.jsx";
import Reports from "./pages/Reports.jsx";
import Errors from "./pages/Errors.jsx";

export default function App() {
  // Disclaimer modal state
  const [disclaimerShow, setDisclaimerShow] = useState(true);

  return (
    <>
      {/* DISCLAIMER */}
      {disclaimerShow && <DisclaimerModal setDisclaimerShow={setDisclaimerShow} />}
      {/* APPLICATION */}
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="/transactions-view" element={<Transactions />} />
          <Route path="/reports-view" element={<Reports />} />
          {/* Error Page */}
          <Route path="/error" element={<Errors />} />
        </Route>
      </Routes>
    </>
  )
}