import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, ArrowLeft } from "lucide-react";
import { 
  SiYoutube, 
  SiInstagram, 
  SiLinkedin, 
  SiFacebook, 
  SiTiktok,
  SiX 
} from "react-icons/si";
import { formatNumber } from "@/lib/utils";

// Utility function to get platform icon
const getPlatformIcon = (platform: string) => {
  switch (platform?.toLowerCase()) {
    case "youtube":
      return <SiYoutube className="h-5 w-5 text-red-600" />;
    case "instagram":
      return <SiInstagram className="h-5 w-5 text-pink-600" />;
    case "linkedin":
      return <SiLinkedin className="h-5 w-5 text-blue-700" />;
    case "facebook":
      return <SiFacebook className="h-5 w-5 text-blue-600" />;
    case "tiktok":
      return <SiTiktok className="h-5 w-5 text-black" />;
    case "twitter":
      return <SiX className="h-5 w-5 text-blue-400" />;
    default:
      return null;
  }
};

export default function StartConversationPage() {
  const { creatorId } = useParams();
  const parsedCreatorId = creatorId ? parseInt(creatorId) : null;
  const [, setLocation] = useLocation();
  const [message, setMessage] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get the mock creator ID (would normally be from auth)
  const currentCreatorId = 1; // In a real app, this would be from auth

  // Query for fetching the other creator's data
  const { 
    data: creator, 
    isLoading: isLoadingCreator,
    isError
  } = useQuery({
    queryKey: ['/api/creators', parsedCreatorId],
    queryFn: () => apiRequest(`/api/creators/${parsedCreatorId}`).then(res => res.json()),
    enabled: !!parsedCreatorId
  });

  // Mutation for creating a new conversation and sending the first message
  const startConversationMutation = useMutation({
    mutationFn: async ({ receiverId, content }: { receiverId: number, content: string }) => {
      // First create a conversation
      const conversationData = await apiRequest(
        `/api/conversations`,
        {
          method: 'POST',
          body: JSON.stringify({
            creator1Id: currentCreatorId,
            creator2Id: receiverId
          })
        }
      ).then(res => res.json());

      // Then send the message in that conversation
      if (content.trim()) {
        await apiRequest(
          `/api/conversations/${conversationData.conversation.id}/messages`,
          {
            method: 'POST',
            body: JSON.stringify({
              senderId: currentCreatorId,
              content
            })
          }
        );
      }

      return conversationData;
    },
    onSuccess: (data) => {
      toast({
        title: "Conversation started",
        description: "Your message has been sent successfully.",
      });

      // Redirect to the conversation
      setLocation(`/messages/${data.conversation.id}`);
      
      // Invalidate relevant queries
      queryClient.invalidateQueries({ 
        queryKey: ['/api/creators', currentCreatorId, 'conversations']
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive"
      });
      console.error("Error starting conversation:", error);
    }
  });

  // Handler for starting a conversation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !parsedCreatorId) return;
    
    startConversationMutation.mutate({
      receiverId: parsedCreatorId,
      content: message
    });
  };

  if (isError || (parsedCreatorId && parsedCreatorId === currentCreatorId)) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" onClick={() => setLocation("/creators")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Creators
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Unable to Start Conversation</CardTitle>
            <CardDescription className="text-center">
              {parsedCreatorId === currentCreatorId 
                ? "You cannot start a conversation with yourself."
                : "We couldn't find the creator you're looking for."}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button onClick={() => setLocation("/creators")}>
              Find Other Creators
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={() => setLocation("/creators")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Creators
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-center">Start a Conversation</CardTitle>
          <CardDescription className="text-center">
            Send a message to connect with this creator
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {isLoadingCreator ? (
            <div className="flex justify-center p-6">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage 
                  src={creator.avatar || undefined} 
                  alt={creator.name} 
                />
                <AvatarFallback className="text-2xl">
                  {creator.name
                    .split(" ")
                    .map(n => n[0])
                    .join("")
                    .toUpperCase()
                    .substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold flex items-center justify-center gap-2">
                  {creator.name}
                  {getPlatformIcon(creator.primaryPlatform)}
                </h3>
                <p className="text-muted-foreground">@{creator.username}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-sm">
                  {formatNumber(creator.followers)} followers
                </Badge>
                <Badge variant="outline" className="text-sm">
                  {creator.primaryPlatform}
                </Badge>
              </div>
              
              <p className="text-center max-w-md">{creator.bio}</p>
              
              <form onSubmit={handleSubmit} className="w-full space-y-4 pt-4">
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Write a message to ${creator.name}...`}
                  className="min-h-24"
                  required
                />
                
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={startConversationMutation.isPending || !message.trim()}
                    className="gap-2"
                  >
                    {startConversationMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}