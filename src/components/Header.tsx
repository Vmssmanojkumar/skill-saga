import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/home", label: "Home" },
    { path: "/courses", label: "Courses" },
    { path: "/login", label: "Login" },
    { path: "/signup", label: "Signup" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/home" 
          className="flex items-center gap-2 group"
        >
          <span className="text-2xl font-display font-bold text-gradient">
            Skill Saga
          </span>
          <span className="text-primary text-xl">⚔️</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-4 py-2 rounded-lg font-game font-semibold text-sm transition-all duration-300",
                isActive(link.path)
                  ? "bg-primary text-primary-foreground glow-orange"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
