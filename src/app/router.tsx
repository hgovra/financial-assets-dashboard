import AppLayout from "@/components/layout/AppLayout";
import AssetsPage from "@/features/assets/pages/AssetsPage";
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
