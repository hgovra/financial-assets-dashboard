import { Route, Routes } from "react-router-dom";

import AppLayout from "@/components/layout/AppLayout";
import NotFound from "@/components/layout/NotFound";
import AssetsPage from "@/features/assets/pages/AssetsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<AssetsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
