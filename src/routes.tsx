import AssetsPage from "@/features/assets/pages/AssetsPage";
import AppLayout from "@/layout/AppLayout";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<AssetsPage />} />
      </Route>

      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
}
