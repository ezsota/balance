import { Route, Routes } from "react-router-dom";
// Pages:
import DashboardLayout from "./layouts/DashboardLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<ExpenseLanding />}/>
        <Route path="/component1" element={<component1/>/>}/>
      </Route>
    </Routes>
  )
}