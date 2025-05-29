import { Route, Routes } from "react-router";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { RootLayout } from "@/components/layout/root-layout";
import React from "react";

const HomePage = React.lazy(() => import("./pages/home"));
const LoginPage = React.lazy(() => import("./pages/auth/login"));
const RegisterPage = React.lazy(() => import("./pages/auth/register"));
const ArticlesPage = React.lazy(() => import("./pages/articles/articles"));
const ArticleDetailPage = React.lazy(() => import("./pages/articles/article-detail"));

export function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<HomePage />} />
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
