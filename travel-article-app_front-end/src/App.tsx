import { Route, Routes } from "react-router";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RootLayout } from "@/components/layout/root-layout";
import HelloTest from "./pages/test-page";

export function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/articles"
          element={
            <ProtectedRoute>
              <HelloTest />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
