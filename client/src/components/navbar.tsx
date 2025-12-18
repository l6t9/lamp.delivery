import { Link, useLocation } from "wouter";
import { Moon, Sun, Palette, Menu, X } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { themes } from "@/lib/themes";

export default function Navbar() {
  const { theme, setTheme, colorScheme, setColorScheme } = useTheme();
  const [location] = useLocation();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location === "/") {
      const element = document.getElementById("projects");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home first, then scroll to projects
      window.location.href = "/#projects";
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 dark:border-white/5">
      <div className="container mx-auto px-6 h-16 flex items-center justify-center">
        <div className="flex items-center gap-8 absolute left-6">
          <Link href="/" className="text-lg font-bold font-mono tracking-tight hover:text-primary transition-colors">
            lamp
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location === "/" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary cursor-pointer"
          >
            Projects
          </a>
          <Link
            href="/music"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              location === "/music" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Music
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden absolute left-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="hover:bg-primary/10 hover:text-primary"
          >
            {showMobileMenu ? (
              <X className="h-[1.2rem] w-[1.2rem]" />
            ) : (
              <Menu className="h-[1.2rem] w-[1.2rem]" />
            )}
          </Button>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-card border-b border-border/50 shadow-lg z-40">
            <div className="flex flex-col p-4 space-y-2">
              <Link
                href="/"
                onClick={() => setShowMobileMenu(false)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  location === "/" 
                    ? "bg-primary/20 text-foreground" 
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                )}
              >
                Home
              </Link>
              <a
                href="#projects"
                onClick={(e) => {
                  handleScrollToProjects(e);
                  setShowMobileMenu(false);
                }}
                className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
              >
                Projects
              </a>
              <Link
                href="/music"
                onClick={() => setShowMobileMenu(false)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  location === "/music" 
                    ? "bg-primary/20 text-foreground" 
                    : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                )}
              >
                Music
              </Link>
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 absolute right-6">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="rounded-full hover:bg-primary/10 hover:text-primary"
              data-testid="button-theme-selector"
            >
              <Palette className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Color schemes</span>
            </Button>
            {showThemeMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-card border border-primary/30 rounded-lg shadow-lg z-50">
                {Object.entries(themes).map(([key, themeData]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setColorScheme(key);
                      setShowThemeMenu(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm transition-colors hover:bg-primary/10",
                      colorScheme === key ? "text-primary font-semibold" : "text-muted-foreground"
                    )}
                    data-testid={`button-theme-${key}`}
                  >
                    {themeData.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full hover:bg-primary/10 hover:text-primary"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
