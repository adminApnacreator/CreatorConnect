import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { insertServiceSchema, Service } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Loader2 } from "lucide-react";

// Extend the service schema with validation rules
const serviceFormSchema = insertServiceSchema.extend({
  title: z.string().min(5, "Title must be at least 5 characters"),
  shortDescription: z.string().min(10, "Short description must be at least 10 characters"),
  longDescription: z.string().min(30, "Long description must be at least 30 characters"),
  price: z.number().min(5, "Price must be at least 5"),
  deliveryDays: z.number().min(1, "Delivery days must be at least 1"),
  deliverables: z.string().min(5, "Please add at least one deliverable")
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export default function ServiceForm() {
  const { id, serviceId } = useParams();
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const creatorId = parseInt(id || "0");
  const isEditing = serviceId !== undefined;
  const serviceIdNum = serviceId ? parseInt(serviceId) : 0;

  // Fetch service data if editing
  const { data: service, isLoading: serviceLoading } = useQuery({
    queryKey: ['/api/creators', creatorId, 'services', serviceIdNum],
    queryFn: async () => {
      if (!isEditing) return null;
      const data = await apiRequest<Service>(`/api/creators/${creatorId}/services/${serviceIdNum}`);
      return data;
    },
    enabled: isEditing
  });

  // Define form with validation
  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues: {
      creatorId,
      title: service?.title || "",
      shortDescription: service?.shortDescription || "",
      longDescription: service?.longDescription || "",
      price: service?.price || 0,
      deliveryDays: service?.deliveryDays || 1,
      deliverables: service?.deliverables || "",
      revisions: service?.revisions || 1
    },
    values: service as ServiceFormValues
  });

  // Handle form submission
  const createServiceMutation = useMutation({
    mutationFn: async (data: ServiceFormValues) => {
      setIsSubmitting(true);
      try {
        if (isEditing) {
          return await apiRequest(`/api/creators/${creatorId}/services/${serviceIdNum}`, {
            method: 'PATCH',
            body: JSON.stringify(data)
          });
        } else {
          return await apiRequest(`/api/creators/${creatorId}/services`, {
            method: 'POST',
            body: JSON.stringify(data)
          });
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['/api/creators', creatorId, 'services'] });
      
      // Show success message
      toast({
        title: isEditing ? "Service updated" : "Service created",
        description: isEditing 
          ? "Your service has been updated successfully."
          : "Your new service has been created successfully.",
        variant: "default"
      });
      
      // Navigate back to profile page
      navigate(`/creator/${creatorId}`);
    },
    onError: (error) => {
      console.error("Error submitting service:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your service. Please try again.",
        variant: "destructive"
      });
    }
  });

  // Handle form submission
  const onSubmit = (data: ServiceFormValues) => {
    createServiceMutation.mutate(data);
  };

  if (serviceLoading) {
    return (
      <div className="container mx-auto py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold">Loading service...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate(`/creator/${creatorId}`)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Profile
          </Button>
          <h1 className="text-3xl font-bold">{isEditing ? "Edit Service" : "Create New Service"}</h1>
          <p className="text-gray-600 mt-2">
            {isEditing 
              ? "Update your service information to attract more clients."
              : "Define a new service that you can offer to potential clients."}
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{isEditing ? "Edit Service Details" : "Service Details"}</CardTitle>
            <CardDescription>
              Provide detailed information about your service to help clients understand what you offer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Professional Instagram Post Design" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          A clear, concise title that describes your service.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shortDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Short Description</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Eye-catching Instagram posts that boost engagement" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          A brief one-line summary that appears in search results.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="longDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your service in detail, including what clients will receive..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a comprehensive description of what you offer, your process, and unique value.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min="5"
                            placeholder="e.g., 100" 
                            {...field}
                            onChange={e => field.onChange(parseFloat(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Set a competitive price for your service.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deliveryDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Delivery Time (days)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            min="1"
                            placeholder="e.g., 3" 
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          How many days will it take to deliver the service?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="revisions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Revisions</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            min="0"
                            placeholder="e.g., 2" 
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Number of revisions included in the service.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="deliverables"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deliverables</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List what's included, one item per line or comma-separated" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Clearly list what clients will receive (e.g., "3 high-resolution images, Source files, Commercial usage rights")
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(`/creator/${creatorId}`)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-[#00C6FF] to-[#0072FF]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEditing ? "Update Service" : "Create Service"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h3 className="text-lg font-semibold mb-3">Tips for Creating Effective Services</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Be specific about what clients will receive</li>
            <li>• Include examples of your previous work if relevant</li>
            <li>• Set realistic delivery timeframes</li>
            <li>• Clearly define any limitations or scope boundaries</li>
            <li>• Consider offering multiple tiers (basic, standard, premium)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}