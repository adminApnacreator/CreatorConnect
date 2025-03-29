import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import { useAuth } from "@/lib/AuthContext";
import CreatorProfile from "@/pages/creator-profile";
import ServiceForm from "@/pages/service-form";
import MessagesPage from "@/pages/messages";
import StartConversationPage from "@/pages/start-conversation";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/messages" component={MessagesPage} />
      <Route path="/messages/:conversationId" component={MessagesPage} />
      <Route path="/conversation/new/:creatorId" component={StartConversationPage} />
      <Route path="/creators/:id" component={CreatorProfile} />
      <Route path="/creators/:id/service" component={ServiceForm} />
      <Route path="/creators/:id/service/:serviceId" component={ServiceForm} />
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
