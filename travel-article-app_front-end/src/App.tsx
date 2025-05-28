import { Route, Routes } from "react-router";
import { ArticlesPage } from "@/pages/articles";
import { ArticleDetailPage } from "@/pages/article-detail";
import { LoginPage } from "@/pages/login";
import { RegisterPage } from "@/pages/register";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RootLayout } from "@/components/layout/root-layout";

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
              <ArticlesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/articles/:id"
          element={
            <ProtectedRoute>
              <ArticleDetailPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App
