import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/lib/store";
import { Link, useNavigate } from "react-router";

export function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <Link to="/" className="mx-6 flex items-center space-x-2">
          <span className="text-lg font-bold">TravelBlog</span>
        </Link>
        <nav className="flex flex-1 items-center justify-between space-x-2">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Home
            </Link>
            {isAuthenticated && (
              <Link
                to="/articles"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Articles
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-4 mx-6">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user?.name}
                </span>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
