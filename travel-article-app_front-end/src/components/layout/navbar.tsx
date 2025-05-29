import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store";
import { Link, useNavigate } from "react-router";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import LogoutDialog from "../auth/logout-dialog";

export function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
    setShowLogoutDialog(false);
  };

  const NavItems = () => (
    <>
      <Link
        to="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        onClick={() => setIsOpen(false)}
      >
        Home
      </Link>
      {isAuthenticated && (
        <Link
          to="/articles"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          onClick={() => setIsOpen(false)}
        >
          Articles
        </Link>
      )}
    </>
  );

  const AuthButtons = () => (
    <>
      {isAuthenticated ? (
        <>
          <span className="text-sm text-muted-foreground">
            Welcome, {user?.name}
          </span>
          <Button variant="ghost" onClick={() => setShowLogoutDialog(true)}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild onClick={() => setIsOpen(false)}>
            <Link to="/register">Register</Link>
          </Button>
        </>
      )}
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center px-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-lg font-bold">TravelBlog</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 items-center justify-between">
            <div className="flex items-center space-x-4 ml-6">
              <NavItems />
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <AuthButtons />
            </div>
          </nav>

          {/* Mobile Nav */}
          <div className="flex flex-1 items-center justify-end space-x-4 md:hidden">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <nav className="flex flex-col space-y-4 mt-4">
                  <NavItems />
                  <div className="flex flex-col space-y-4">
                    <AuthButtons />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <LogoutDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogout}
      />
    </>
  );
}
