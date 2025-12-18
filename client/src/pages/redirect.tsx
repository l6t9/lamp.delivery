import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Redirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.href = to;
  }, [to]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-muted-foreground">Redirecting to {to}...</p>
    </div>
  );
}