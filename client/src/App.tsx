import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { useAuth } from "@/lib/AuthContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home}/>
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const { currentUser, isLoading } = useAuth();
  
  // Log authentication state changes
  useEffect(() => {
    if (!isLoading) {
      console.log("Authentication state:", currentUser ? "Logged in" : "Logged out");
    }
  }, [currentUser, isLoading]);

  if (isLoading) {
    // You could show a loading spinner here if needed
    return null;
  }

  return <Router />;
}

export default App;
