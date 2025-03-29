import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { 
  ArrowUpRight, 
  Calendar, 
  Check, 
  Clock, 
  DollarSign, 
  Heart, 
  MessageSquare, 
  Pencil, 
  Share2, 
  Star, 
  Users 
} from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { useAuth } from "@/lib/AuthContext";
import { Creator, Service } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

// Types for earnings and tasks
interface EarningsData {
  earnings: {
    month: string;
    amount: number;
  }[];
  stats: {
    totalEarned: number;
    growthPercentage: number;
    activeOrders: number;
    activeOrdersValue: number;
    completionRate: number;
  };
}

interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: "pending" | "confirmed" | "in_progress";
  amount: number;
  clientName: string;
  clientAvatar: string;
}

export default function CreatorProfile() {
  const { id } = useParams();
  const creatorId = parseInt(id || "1");
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("services");
  const isCreatorProfile = true; // This would be determined by comparing the current user ID with the profile ID

  // Fetch creator data
  const { data: creator, isLoading: creatorLoading } = useQuery({
    queryKey: ['/api/creators', creatorId],
    queryFn: async () => {
      const data = await apiRequest<Creator>(`/api/creators/${creatorId}`);
      return data;
    }
  });

  // Fetch creator services
  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['/api/creators', creatorId, 'services'],
    queryFn: async () => {
      const data = await apiRequest<Service[]>(`/api/creators/${creatorId}/services`);
      return data;
    }
  });
  
  // Fetch creator earnings
  const { data: earningsData, isLoading: earningsLoading } = useQuery({
    queryKey: ['/api/creators', creatorId, 'earnings'],
    queryFn: async () => {
      if (!isCreatorProfile) return null;
      const data = await apiRequest<EarningsData>(`/api/creators/${creatorId}/earnings`);
      return data;
    },
    enabled: isCreatorProfile && activeTab === 'earnings'
  });
  
  // Fetch creator tasks
  const { data: tasks, isLoading: tasksLoading } = useQuery({
    queryKey: ['/api/creators', creatorId, 'tasks'],
    queryFn: async () => {
      if (!isCreatorProfile) return null;
      const data = await apiRequest<Task[]>(`/api/creators/${creatorId}/tasks`);
      return data;
    },
    enabled: isCreatorProfile && activeTab === 'tasks'
  });

  if (creatorLoading || servicesLoading ||
     (isCreatorProfile && activeTab === 'earnings' && earningsLoading) ||
     (isCreatorProfile && activeTab === 'tasks' && tasksLoading)) {
    return (
      <div className="container mx-auto py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Loading profile...</h2>
        </div>
      </div>
    );
  }

  if (!creator) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Creator not found</h2>
        <p className="text-gray-600 mb-8">The creator profile you're looking for doesn't exist or has been removed.</p>
        <Button href="/" variant="default">Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header / Profile Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-[#00C6FF] to-[#0072FF] h-32 md:h-48"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
            <div>
              <img 
                src={creator.avatar || "https://ui-avatars.com/api/?name=" + creator.name}
                alt={creator.name} 
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <h1 className="text-2xl md:text-3xl font-bold">{creator.name}</h1>
                <Badge className="w-fit bg-gradient-to-r from-[#00C6FF] to-[#0072FF] hover:from-[#0072FF] hover:to-[#00C6FF]">
                  {creator.primaryPlatform}
                </Badge>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <span className="font-semibold">@{creator.username}</span>
                <span>•</span>
                <span>{creator.location}</span>
              </div>
              <p className="text-gray-700 max-w-2xl">{creator.bio}</p>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              {!isCreatorProfile && (
                <Button variant="default" className="bg-gradient-to-r from-[#00C6FF] to-[#0072FF] hover:from-[#0072FF] hover:to-[#00C6FF]">
                  <MessageSquare className="mr-2 h-4 w-4" /> Message
                </Button>
              )}
              {isCreatorProfile && (
                <Button variant="outline">
                  <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                </Button>
              )}
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-gray-100">
          <div className="py-4 px-6 text-center border-r border-gray-100">
            <div className="text-gray-500 text-sm">Followers</div>
            <div className="font-bold text-xl">{formatNumber(creator.followers)}</div>
          </div>
          <div className="py-4 px-6 text-center border-r border-gray-100">
            <div className="text-gray-500 text-sm">Engagement</div>
            <div className="font-bold text-xl">{creator.engagementRate}%</div>
          </div>
          <div className="py-4 px-6 text-center border-r border-gray-100">
            <div className="text-gray-500 text-sm">Completed Jobs</div>
            <div className="font-bold text-xl">24</div>
          </div>
          <div className="py-4 px-6 text-center">
            <div className="text-gray-500 text-sm">Rating</div>
            <div className="font-bold text-xl flex items-center justify-center">
              4.9 <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs defaultValue="services" onValueChange={setActiveTab}>
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <TabsList className="w-full justify-start border-b p-0 rounded-none">
                <TabsTrigger value="services" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0072FF]">Services</TabsTrigger>
                {isCreatorProfile && (
                  <>
                    <TabsTrigger value="earnings" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0072FF]">Earnings</TabsTrigger>
                    <TabsTrigger value="tasks" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0072FF]">Upcoming Tasks</TabsTrigger>
                  </>
                )}
                <TabsTrigger value="about" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-[#0072FF]">About</TabsTrigger>
              </TabsList>
            </div>

            {/* Services Tab */}
            <TabsContent value="services" className="mt-0">
              <div className="space-y-6">
                {services && services.length > 0 ? (
                  services.map((service) => (
                    <Card key={service.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.shortDescription}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <div className="text-lg font-bold text-[#0072FF] mb-2">
                          {formatCurrency(service.price)}
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {service.longDescription}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {service.deliverables.split(",").map((deliverable, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-600">
                              <Check className="h-4 w-4 mr-1 text-green-500" />
                              <span>{deliverable.trim()}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-2">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Delivery in {service.deliveryDays} days</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-3 flex justify-between border-t border-gray-100">
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4 mr-2" /> Save
                        </Button>
                        <Button size="sm" className="bg-gradient-to-r from-[#00C6FF] to-[#0072FF] hover:from-[#0072FF] hover:to-[#00C6FF]">
                          Order Now <ArrowUpRight className="h-4 w-4 ml-2" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">No services listed yet</h3>
                    <p className="text-gray-600 mb-6">This creator hasn't listed any services yet.</p>
                    {isCreatorProfile && (
                      <Button variant="default" className="bg-gradient-to-r from-[#00C6FF] to-[#0072FF] hover:from-[#0072FF] hover:to-[#00C6FF]">
                        <Pencil className="mr-2 h-4 w-4" /> Add a Service
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Earnings Tab - Only visible to the profile owner */}
            <TabsContent value="earnings" className="mt-0">
              {isCreatorProfile ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Earnings Overview</CardTitle>
                      <CardDescription>Your earnings over the last 6 months</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] mt-4">
                        {earningsData && (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={earningsData.earnings}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip 
                                formatter={(value) => [`${formatCurrency(value as number)}`, 'Earnings']}
                              />
                              <Bar 
                                dataKey="amount" 
                                fill="#0072FF" 
                                radius={[4, 4, 0, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {earningsData && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-gray-500">Total Earned</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{formatCurrency(earningsData.stats.totalEarned)}</div>
                          <p className="text-xs text-green-600 flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-1" /> 
                            {earningsData.stats.growthPercentage}% from last month
                          </p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-gray-500">Active Orders</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{earningsData.stats.activeOrders}</div>
                          <p className="text-xs text-gray-500">Worth {formatCurrency(earningsData.stats.activeOrdersValue)}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium text-gray-500">Completion Rate</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{earningsData.stats.completionRate}%</div>
                          <Progress value={earningsData.stats.completionRate} className="h-2" />
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold">Private Information</h3>
                  <p className="text-gray-600">This information is only visible to the creator.</p>
                </div>
              )}
            </TabsContent>

            {/* Upcoming Tasks Tab - Only visible to the profile owner */}
            <TabsContent value="tasks" className="mt-0">
              {isCreatorProfile ? (
                <div className="space-y-4">
                  {tasks && tasks.length > 0 ? (
                    tasks.map((task) => (
                      <Card key={task.id} className="overflow-hidden">
                        <div className={`h-1 ${
                          task.status === 'confirmed' ? 'bg-green-500' :
                          task.status === 'in_progress' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`}></div>
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{task.title}</CardTitle>
                            <Badge className={`${
                              task.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                              task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {task.status === 'confirmed' ? 'Confirmed' :
                              task.status === 'in_progress' ? 'In Progress' : 'Pending'}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <div className="flex items-center mb-4">
                            <img 
                              src={task.clientAvatar} 
                              alt={task.clientName}
                              className="w-10 h-10 rounded-full mr-3" 
                            />
                            <div>
                              <div className="font-medium">{task.clientName}</div>
                              <div className="text-sm text-gray-500">Client</div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-500 mb-1">Due Date</div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                {new Date(task.dueDate).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500 mb-1">Payment</div>
                              <div className="flex items-center font-medium text-green-600">
                                <DollarSign className="h-4 w-4 mr-2" />
                                {formatCurrency(task.amount)}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="pt-3 flex justify-between border-t border-gray-100">
                          <Button variant="outline" size="sm">View Details</Button>
                          {task.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Decline</Button>
                              <Button size="sm" className="bg-gradient-to-r from-[#00C6FF] to-[#0072FF]">Accept</Button>
                            </div>
                          )}
                          {task.status === 'confirmed' && (
                            <Button size="sm" className="bg-gradient-to-r from-[#00C6FF] to-[#0072FF]">Start Work</Button>
                          )}
                          {task.status === 'in_progress' && (
                            <Button size="sm" className="bg-gradient-to-r from-[#00C6FF] to-[#0072FF]">Deliver Work</Button>
                          )}
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                      <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
                      <p className="text-gray-600 mb-6">You don't have any upcoming tasks or requests at the moment.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold">Private Information</h3>
                  <p className="text-gray-600">This information is only visible to the creator.</p>
                </div>
              )}
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>About {creator.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Bio</h3>
                    <p className="text-gray-700">{creator.bio}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Platforms</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-red-100 p-2 rounded-full">
                          <Users className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <div className="font-medium">{creator.primaryPlatform}</div>
                          <div className="text-sm text-gray-500">{formatNumber(creator.followers)} followers</div>
                        </div>
                      </div>
                      
                      {creator.otherPlatforms?.split(",").map((platform, idx) => (
                        <div className="flex items-center gap-3" key={idx}>
                          <div className="bg-blue-100 p-2 rounded-full">
                            <Users className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <div className="font-medium">{platform.trim()}</div>
                            <div className="text-sm text-gray-500">Verified profile</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Content Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {creator.contentCategories?.split(",").map((category, idx) => (
                        <Badge key={idx} variant="outline" className="px-3 py-1">
                          {category.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-4">
                      {creator.languages?.split(",").map((language, idx) => (
                        <div key={idx} className="text-gray-700">
                          <span className="font-medium">{language.split("(")[0].trim()}</span>
                          {language.includes("(") && (
                            <span className="text-gray-500 text-sm"> ({language.split("(")[1].replace(")", "")})</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Get in Touch</CardTitle>
              <CardDescription>Send a direct message to {creator.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    className="min-h-[120px] w-full rounded-md border border-gray-300 p-3 text-sm"
                    placeholder={`Hi ${creator.name}, I'm interested in working with you...`}
                  ></textarea>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#00C6FF] to-[#0072FF]">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Statistics Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="font-medium">98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">On-time Delivery</span>
                  <span className="font-medium">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Satisfaction Score</span>
                  <span className="font-medium">4.9/5</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Contact Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm">
                <div className="font-medium mb-1">Email</div>
                <div className="text-gray-600">{creator.email || "contact@example.com"}</div>
              </div>
              <div className="text-sm">
                <div className="font-medium mb-1">Location</div>
                <div className="text-gray-600">{creator.location}</div>
              </div>
              <div className="text-sm">
                <div className="font-medium mb-1">Member Since</div>
                <div className="text-gray-600">March 2024</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}