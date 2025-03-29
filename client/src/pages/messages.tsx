import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest, getQueryFn } from "@/lib/queryClient";
import { useParams, useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, ChevronLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { 
  SiYoutube, 
  SiInstagram, 
  SiLinkedin, 
  SiFacebook, 
  SiTiktok
} from "react-icons/si";
import { SiX } from "react-icons/si"; // formerly Twitter, now X

// Utility function to get platform icon
const getPlatformIcon = (platform: string) => {
  switch (platform?.toLowerCase()) {
    case "youtube":
      return <SiYoutube className="h-4 w-4 text-red-600" />;
    case "instagram":
      return <SiInstagram className="h-4 w-4 text-pink-600" />;
    case "linkedin":
      return <SiLinkedin className="h-4 w-4 text-blue-700" />;
    case "facebook":
      return <SiFacebook className="h-4 w-4 text-blue-600" />;
    case "tiktok":
      return <SiTiktok className="h-4 w-4 text-black" />;
    case "twitter":
      return <SiX className="h-4 w-4 text-blue-400" />;
    default:
      return null;
  }
};

// Type definitions
interface Creator {
  id: number;
  name: string;
  username: string;
  avatar: string | null;
  primaryPlatform: string;
}

interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  receiverId: number;
  content: string;
  read: boolean;
  createdAt: string;
}

interface Conversation {
  id: number;
  creator1Id: number;
  creator2Id: number;
  lastMessageAt: string;
  createdAt: string;
  otherCreator: Creator;
  unreadCount: number;
  lastMessage: {
    content: string;
    createdAt: string;
    isFromOtherPerson: boolean;
  } | null;
}

interface ConversationDetailResponse {
  messages: Message[];
  conversation: Conversation;
  otherCreator: Creator;
}

const AvatarWithFallback = ({ avatarUrl, name }: { avatarUrl: string | null, name: string }) => {
  const initials = name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <Avatar>
      <AvatarImage src={avatarUrl || undefined} alt={name} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};

// Message component that displays a single message
const MessageBubble = ({ 
  message, 
  isFromCurrentUser,
  currentUserAvatar,
  currentUserName,
  otherUserAvatar,
  otherUserName
}: { 
  message: Message, 
  isFromCurrentUser: boolean,
  currentUserAvatar: string | null,
  currentUserName: string,
  otherUserAvatar: string | null,
  otherUserName: string
}) => {
  return (
    <div className={`flex gap-2 mb-4 ${isFromCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isFromCurrentUser && (
        <AvatarWithFallback avatarUrl={otherUserAvatar} name={otherUserName} />
      )}
      <div>
        <div className={`px-4 py-2 rounded-2xl max-w-md ${
          isFromCurrentUser 
            ? 'bg-blue-600 text-white rounded-tr-none' 
            : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
        }`}>
          <p>{message.content}</p>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
        </p>
      </div>
      {isFromCurrentUser && (
        <AvatarWithFallback avatarUrl={currentUserAvatar} name={currentUserName} />
      )}
    </div>
  );
};

// Conversation List Item Component
const ConversationListItem = ({ 
  conversation, 
  isActive, 
  onClick 
}: { 
  conversation: Conversation, 
  isActive: boolean,
  onClick: () => void 
}) => {
  const timeAgo = formatDistanceToNow(new Date(conversation.lastMessageAt), { addSuffix: true });
  
  return (
    <div 
      onClick={onClick} 
      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-accent rounded-lg transition-colors ${
        isActive ? 'bg-accent' : ''
      }`}
    >
      <AvatarWithFallback 
        avatarUrl={conversation.otherCreator.avatar} 
        name={conversation.otherCreator.name} 
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-1">
            <span className="font-semibold truncate">{conversation.otherCreator.name}</span>
            {getPlatformIcon(conversation.otherCreator.primaryPlatform)}
          </div>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{timeAgo}</span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground truncate">
            {conversation.lastMessage 
              ? (conversation.lastMessage.isFromOtherPerson ? '' : 'You: ') + conversation.lastMessage.content 
              : 'Start a conversation'}
          </p>
          {conversation.unreadCount > 0 && (
            <Badge variant="default" className="ml-2 rounded-full">
              {conversation.unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};

export default function MessagesPage() {
  const { currentUser } = useAuth();
  const [, setLocation] = useLocation();
  const { conversationId } = useParams();
  const [message, setMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<number | null>(
    conversationId ? parseInt(conversationId) : null
  );
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (conversationId) {
      setSelectedConversation(parseInt(conversationId));
    }
  }, [conversationId]);

  // Get the mock creator ID (would normally be from auth)
  const mockCreatorId = 1; // In a real app, this would be from auth

  // Query for fetching conversations
  const { 
    data: conversations, 
    isLoading: isLoadingConversations 
  } = useQuery({
    queryKey: ['/api/creators', mockCreatorId, 'conversations'],
    queryFn: getQueryFn({ on401: "returnNull" }),
    enabled: !!mockCreatorId
  });

  // Query for fetching conversation details
  const { 
    data: conversationDetails, 
    isLoading: isLoadingConversationDetails 
  } = useQuery({
    queryKey: ['/api/conversations', selectedConversation, 'messages', mockCreatorId],
    queryFn: () => apiRequest(
      `/api/conversations/${selectedConversation}/messages?creatorId=${mockCreatorId}`
    ).then(res => res.json()),
    enabled: !!selectedConversation && !!mockCreatorId,
    refetchInterval: 5000 // Poll for new messages every 5 seconds
  });
  
  // Mutation for sending a message
  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      if (!selectedConversation) {
        throw new Error("No conversation selected");
      }
      
      return apiRequest(
        `/api/conversations/${selectedConversation}/messages`,
        {
          method: 'POST',
          body: JSON.stringify({
            senderId: mockCreatorId,
            content
          })
        }
      ).then(res => res.json());
    },
    onSuccess: () => {
      // Clear the message input
      setMessage("");
      // Invalidate queries to refetch conversation data
      queryClient.invalidateQueries({ 
        queryKey: ['/api/conversations', selectedConversation, 'messages']
      });
      queryClient.invalidateQueries({ 
        queryKey: ['/api/creators', mockCreatorId, 'conversations']
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
      console.error("Error sending message:", error);
    }
  });

  // Mutation for creating a new conversation
  const createConversationMutation = useMutation({
    mutationFn: async (receiverId: number) => {
      return apiRequest(
        `/api/conversations`,
        {
          method: 'POST',
          body: JSON.stringify({
            creator1Id: mockCreatorId,
            creator2Id: receiverId
          })
        }
      ).then(res => res.json());
    },
    onSuccess: (data) => {
      setSelectedConversation(data.conversation.id);
      // Update the URL
      setLocation(`/messages/${data.conversation.id}`);
      // Invalidate conversations query
      queryClient.invalidateQueries({ 
        queryKey: ['/api/creators', mockCreatorId, 'conversations']
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create conversation. Please try again.",
        variant: "destructive"
      });
      console.error("Error creating conversation:", error);
    }
  });

  // Handler for sending a message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    sendMessageMutation.mutate(message);
  };

  // Handler for selecting a conversation
  const handleSelectConversation = (conversationId: number) => {
    setSelectedConversation(conversationId);
    setLocation(`/messages/${conversationId}`);
  };

  if (!mockCreatorId) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] gap-6 p-4">
        <h2 className="text-2xl font-bold text-center">Sign in to view your messages</h2>
        <p className="text-center text-muted-foreground">
          Please sign in or create an account to access your messages and connect with other creators.
        </p>
        <Button onClick={() => setLocation("/login")}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <Link href="/creators">
          <Button variant="outline">Find Creators</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Conversations List */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Conversations</CardTitle>
            <CardDescription>Connect with other creators</CardDescription>
          </CardHeader>
          <CardContent className="p-0 max-h-[500px] overflow-y-auto">
            {isLoadingConversations ? (
              <div className="flex justify-center p-6">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : conversations?.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-muted-foreground">No conversations yet.</p>
                <p className="text-sm">Connect with other creators to start chatting!</p>
              </div>
            ) : (
              <div className="space-y-1 px-1">
                {conversations?.map((conversation: Conversation) => (
                  <ConversationListItem
                    key={conversation.id}
                    conversation={conversation}
                    isActive={selectedConversation === conversation.id}
                    onClick={() => handleSelectConversation(conversation.id)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Messages/Conversation View */}
        <Card className="md:col-span-2 flex flex-col">
          {!selectedConversation ? (
            <div className="flex flex-col items-center justify-center h-80 p-6">
              <p className="text-muted-foreground mb-4">Select a conversation to start chatting</p>
            </div>
          ) : (
            <>
              <CardHeader className="pb-3">
                {isLoadingConversationDetails ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <CardTitle>Loading conversation...</CardTitle>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="md:hidden">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => {
                            setSelectedConversation(null);
                            setLocation("/messages");
                          }}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                      </div>
                      <AvatarWithFallback 
                        avatarUrl={conversationDetails?.otherCreator?.avatar} 
                        name={conversationDetails?.otherCreator?.name || "Creator"} 
                      />
                      <div>
                        <CardTitle className="flex items-center gap-1">
                          {conversationDetails?.otherCreator?.name}
                          {getPlatformIcon(conversationDetails?.otherCreator?.primaryPlatform)}
                        </CardTitle>
                        <CardDescription>
                          @{conversationDetails?.otherCreator?.username}
                        </CardDescription>
                      </div>
                    </div>
                  </>
                )}
              </CardHeader>
              <CardContent className="flex-grow overflow-y-auto min-h-[400px] max-h-[400px] border-t">
                {isLoadingConversationDetails ? (
                  <div className="flex justify-center items-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {conversationDetails?.messages.length === 0 ? (
                      <div className="text-center text-muted-foreground">
                        <p>No messages yet. Send a message to start the conversation!</p>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        {conversationDetails?.messages.map(message => (
                          <MessageBubble 
                            key={message.id} 
                            message={message}
                            isFromCurrentUser={message.senderId === mockCreatorId}
                            currentUserAvatar={null} // In a real app, get from current user
                            currentUserName="You" // In a real app, get from current user
                            otherUserAvatar={conversationDetails.otherCreator.avatar}
                            otherUserName={conversationDetails.otherCreator.name}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4">
                <form onSubmit={handleSendMessage} className="w-full flex gap-2">
                  <Textarea 
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="min-h-10 resize-none"
                  />
                  <Button 
                    type="submit" 
                    disabled={sendMessageMutation.isPending || !message.trim()}
                  >
                    {sendMessageMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}