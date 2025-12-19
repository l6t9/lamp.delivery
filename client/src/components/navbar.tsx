import { Link, useLocation, useRouter } from "wouter";
import { Moon, Sun, Palette, X, Plus, Menu } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { themes } from "@/lib/themes";

export default function Navbar() {
  const { theme, setTheme, colorScheme, setColorScheme } = useTheme();
  const [location, setLocation] = useLocation();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showAddTabMenu, setShowAddTabMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [openTabs, setOpenTabs] = useState<string[]>(["Home"]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const allPages = [
    { label: "Home", href: "/" },
    { label: "Music", href: "/music" },
    { label: "Projects", href: "/projects" },
    { label: "Anime", href: "/anime" },
  ];

  // Auto-add tab when navigating to a page
  useEffect(() => {
    const currentPageLabel = allPages.find(p => p.href === location)?.label;
    if (currentPageLabel && !openTabs.includes(currentPageLabel)) {
      setOpenTabs(prev => [...prev, currentPageLabel]);
    }
  }, [location, allPages]);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location === "/") {
      const element = document.getElementById("projects");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/#projects";
    }
  };

  const handleCloseTab = (tabLabel: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(tab => tab !== tabLabel);
    
    // Always keep at least one tab open
    if (newTabs.length === 0) {
      setOpenTabs(["Home"]);
      setLocation("/");
    } else {
      setOpenTabs(newTabs);
      
      // If closing the active tab, navigate to another open tab
      const tabRoutes: { [key: string]: string } = {
        "Home": "/",
        "Music": "/music",
        "Projects": "/projects",
        "Anime": "/anime"
      };
      
      if (location === tabRoutes[tabLabel]) {
        const nextTab = newTabs[0];
        setLocation(tabRoutes[nextTab] || "/");
      }
    }
  };

  const getTabHref = (label: string) => {
    const routes: { [key: string]: string } = {
      "Home": "/",
      "Music": "/music",
      "Projects": "/projects",
      "Anime": "/anime"
    };
    return routes[label] || "/";
  };

  const handleAddTab = (pageLabel: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setShowAddTabMenu(false);
    
    const tabHref = getTabHref(pageLabel);
    
    // Add to tabs if not already there
    setOpenTabs(prev => {
      if (!prev.includes(pageLabel)) {
        return [...prev, pageLabel];
      }
      return prev;
    });
    
    // Always navigate to the page, ensuring it happens
    setTimeout(() => setLocation(tabHref), 0);
  };

  const tabs = allPages.map(page => ({
    label: page.label,
    href: page.href,
    active: location === page.href
  }));

  const displayTabs = tabs.filter(tab => openTabs.includes(tab.label));
  const availablePagesToAdd = allPages.filter(page => !openTabs.includes(page.label));

  return (
    <nav className={cn("fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 dark:border-white/5 group relative md:left-1/2 md:-translate-x-1/2 md:top-4 md:w-fit md:rounded-2xl transition-all duration-500", isLoading && "navbar-loading")}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 blur-xl -z-10 group-hover:blur-2xl transition-all duration-500 pointer-events-none md:rounded-2xl"></div>
      <div className="flex items-center gap-4 md:gap-6 h-16 md:h-20 px-4 sm:px-6 md:px-8">
        {/* Logo */}
        <Link href="/" className="text-lg md:text-xl font-bold font-mono tracking-tight hover:text-primary transition-colors flex-shrink-0">
          lamp
        </Link>

        {/* Browser Tabs */}
        <div className={cn("flex items-center gap-1 flex-1 md:flex-none md:gap-2", openTabs.length === 3 && "overflow-x-auto scrollbar-styled")}>
          {displayTabs.map((tab) => (
            <div
              key={tab.label}
              className={cn(
                "flex items-center gap-1 px-3 sm:px-4 md:px-5 py-1.5 md:py-2 text-xs sm:text-sm md:text-base font-medium transition-colors rounded whitespace-nowrap group cursor-pointer",
                tab.active
                  ? "bg-primary/10 text-foreground"
                  : "bg-card/40 text-muted-foreground hover:bg-card/60 hover:text-foreground"
              )}
              onClick={() => setLocation(tab.href)}
            >
              <span className="flex-1">
                {tab.label}
              </span>
              <button
                onClick={(e) => handleCloseTab(tab.label, e)}
                className="ml-1 p-0.5 rounded hover:bg-destructive/20 transition-colors opacity-70 hover:opacity-100 active:opacity-100 flex-shrink-0"
                title={`Close ${tab.label}`}
              >
                <X className="w-3 h-3 sm:w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            </div>
          ))}

          {/* Add Tab Button */}
          <div className="relative">
            <button
              onClick={() => setShowAddTabMenu(!showAddTabMenu)}
              className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-md bg-card/40 text-muted-foreground hover:bg-card/60 hover:text-foreground transition-all text-xs sm:text-sm font-medium"
              title="Add new tab"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
            </button>

            {showAddTabMenu && availablePagesToAdd.length > 0 && (
              <div className="absolute top-full left-0 mt-1 bg-card border border-primary/30 rounded-lg shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
                {availablePagesToAdd.map((page) => (
                  <button
                    key={page.label}
                    onClick={(e) => handleAddTab(page.label, e)}
                    className="w-full text-left px-4 py-2 text-sm transition-colors hover:bg-primary/10 text-foreground first:rounded-t-lg last:rounded-b-lg"
                  >
                    {page.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button - Only show when all tabs are open (collision) */}
        <div className={cn("relative flex-shrink-0", openTabs.length === 3 ? "block" : "hidden")}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="rounded-full hover:bg-primary/10 hover:text-primary h-8 w-8"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Menu</span>
          </Button>
          
          {showMobileMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-card border border-primary/30 rounded-lg shadow-lg z-50" onClick={(e) => e.stopPropagation()}>
              {/* Theme Selector */}
              <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Theme</div>
              {Object.entries(themes).map(([key, themeData]) => (
                <button
                  key={key}
                  onClick={() => {
                    setColorScheme(key);
                    setShowMobileMenu(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm transition-colors hover:bg-primary/10",
                    colorScheme === key ? "text-primary font-semibold" : "text-foreground"
                  )}
                >
                  {themeData.label}
                </button>
              ))}
              
              <div className="border-t border-border/50 my-2"></div>
              
              {/* Dark/Light Toggle */}
              <button
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                  setShowMobileMenu(false);
                }}
                className="w-full text-left px-4 py-2 text-sm transition-colors hover:bg-primary/10 text-foreground flex items-center gap-2"
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-4 w-4" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                    Dark Mode
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Theme Controls - Hide only when all tabs are open (collision) */}
        <div className={cn("flex items-center gap-2 flex-shrink-0", openTabs.length === 3 && "hidden")}>
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="rounded-full hover:bg-primary/10 hover:text-primary h-8 w-8 md:h-9 md:w-9"
              data-testid="button-theme-selector"
            >
              <Palette className="h-4 w-4 md:h-5 md:w-5" />
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
            className="rounded-full hover:bg-primary/10 hover:text-primary h-8 w-8 md:h-9 md:w-9"
          >
            <Sun className="h-4 w-4 md:h-5 md:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 md:h-5 md:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
