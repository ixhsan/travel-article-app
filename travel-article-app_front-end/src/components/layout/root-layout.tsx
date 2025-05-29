import { Outlet } from "react-router";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { ThemeProvider } from "@/components/theme-provider";

export function RootLayout() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="travel-blog-theme">
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
