import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, Mail, Clock, Layers, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertInquirySchema } from "@shared/schema";
import { z } from "zod";

const inquiryFormSchema = insertInquirySchema.extend({
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  message: z.string().min(1, "Message is required"),
});

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      message: "",
    },
  });

  const inquiryMutation = useMutation({
    mutationFn: async (data: z.infer<typeof inquiryFormSchema>) => {
      const response = await apiRequest("POST", "/api/inquiries", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-display font-bold text-primary mb-4">Visit Our Store</h3>
          <p className="text-xl text-accent">Experience our craftsmanship in person</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-warm">
              <CardHeader>
                <CardTitle className="text-2xl font-display font-semibold text-primary">
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-secondary mr-4 mt-1" />
                  <div>
                    <h5 className="font-semibold text-primary mb-1">Store Address</h5>
                    <p className="text-accent">
                      123 Fashion Street, Textile Market<br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-secondary mr-4 mt-1" />
                  <div>
                    <h5 className="font-semibold text-primary mb-1">Phone Numbers</h5>
                    <p className="text-accent">
                      +91 98765 43210<br />
                      +91 87654 32109
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-secondary mr-4 mt-1" />
                  <div>
                    <h5 className="font-semibold text-primary mb-1">Email</h5>
                    <p className="text-accent">
                      info@threadsoftradition.com<br />
                      orders@threadsoftradition.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-secondary mr-4 mt-1" />
                  <div>
                    <h5 className="font-semibold text-primary mb-1">Business Hours</h5>
                    <p className="text-accent">
                      Monday - Saturday: 10:00 AM - 8:00 PM<br />
                      Sunday: 11:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Contact Form */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">Quick Inquiry</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form 
                    onSubmit={form.handleSubmit((data) => {
                      inquiryMutation.mutate(data);
                    })}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Phone Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea 
                              rows={3}
                              placeholder="Your Message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      disabled={inquiryMutation.isPending}
                    >
                      <Layers className="mr-2 h-4 w-4" />
                      {inquiryMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Store Images */}
          <div className="space-y-6">
            <img 
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500" 
              alt="Interior view of traditional Indian clothing store" 
              className="rounded-2xl shadow-lg w-full h-auto" 
            />
            
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Display of colorful Indian fabrics and materials" 
                className="rounded-xl shadow-md w-full h-auto" 
              />
              <img 
                src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                alt="Professional tailoring workspace with sewing equipment" 
                className="rounded-xl shadow-md w-full h-auto" 
              />
            </div>

            {/* Customer testimonial preview */}
            <Card className="bg-primary text-white">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-300">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm opacity-90">5.0 Rating</span>
                </div>
                <p className="text-lg mb-4">
                  "Absolutely beautiful work! My wedding lehenga was perfect in every detail. 
                  The craftsmanship is outstanding."
                </p>
                <p className="font-semibold">- Priya Sharma, Mumbai</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
