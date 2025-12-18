import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Music from "@/pages/music";
import Redirect from "@/pages/redirect";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/music" component={Music} />
      <Route path="/raincord">
        <Redirect to="https://raincord.dev" />
      </Route>
      <Route path="/github">
        <Redirect to="https://github.com/LampDelivery" />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="lampdelivery-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;