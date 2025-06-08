import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layers, Scissors, CloudUpload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertCustomOrderSchema, insertAlterationRequestSchema } from "@shared/schema";
import { z } from "zod";

const customOrderFormSchema = insertCustomOrderSchema.extend({
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  clothingType: z.string().min(1, "Please select a clothing type"),
});

const alterationFormSchema = insertAlterationRequestSchema.extend({
  fullName: z.string().min(1, "Full name is required"),
  contactNumber: z.string().min(10, "Valid phone number is required"),
  garmentType: z.string().min(1, "Please select a garment type"),
  alterationsNeeded: z.string().min(1, "Please select at least one alteration"),
});

export default function OrderSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const customOrderForm = useForm({
    resolver: zodResolver(customOrderFormSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      clothingType: "",
      occasion: "",
      budgetRange: "",
      designDescription: "",
    },
  });

  const alterationForm = useForm({
    resolver: zodResolver(alterationFormSchema),
    defaultValues: {
      fullName: "",
      contactNumber: "",
      garmentType: "",
      alterationsNeeded: "",
      specialInstructions: "",
      preferredDate: "",
    },
  });

  const customOrderMutation = useMutation({
    mutationFn: async (data: z.infer<typeof customOrderFormSchema>) => {
      const response = await apiRequest("POST", "/api/custom-orders", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Order Submitted Successfully!",
        description: "We'll contact you within 24 hours to discuss your requirements.",
      });
      customOrderForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/custom-orders"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive",
      });
    },
  });

  const alterationMutation = useMutation({
    mutationFn: async (data: z.infer<typeof alterationFormSchema>) => {
      const response = await apiRequest("POST", "/api/alteration-requests", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Alteration Request Submitted!",
        description: "We'll contact you to schedule an appointment.",
      });
      alterationForm.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/alteration-requests"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to submit alteration request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const [selectedAlterations, setSelectedAlterations] = useState<string[]>([]);

  const alterationOptions = [
    { id: "size", label: "Size adjustment (₹200-₹500)" },
    { id: "length", label: "Length alteration (₹150-₹300)" },
    { id: "sleeve", label: "Sleeve adjustment (₹100-₹250)" },
    { id: "repair", label: "Repair work (₹100-₹400)" },
  ];

  const handleAlterationChange = (alterationId: string, checked: boolean) => {
    if (checked) {
      setSelectedAlterations([...selectedAlterations, alterationId]);
    } else {
      setSelectedAlterations(selectedAlterations.filter(id => id !== alterationId));
    }
    alterationForm.setValue("alterationsNeeded", JSON.stringify(selectedAlterations));
  };

  return (
    <section id="order" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-display font-bold text-primary mb-4">Place Your Custom Order</h3>
            <p className="text-xl text-accent">Tell us about your dream outfit and we'll bring it to life</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Custom Order Form */}
            <Card className="bg-warm">
              <CardHeader>
                <CardTitle className="text-2xl font-display font-semibold text-primary">
                  Custom Clothing Order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...customOrderForm}>
                  <form 
                    onSubmit={customOrderForm.handleSubmit((data) => {
                      customOrderMutation.mutate(data);
                    })}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={customOrderForm.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={customOrderForm.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 98765 43210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={customOrderForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={customOrderForm.control}
                      name="clothingType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Clothing Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select clothing type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="saree">Saree</SelectItem>
                              <SelectItem value="lehenga">Lehenga</SelectItem>
                              <SelectItem value="salwar">Salwar Kameez</SelectItem>
                              <SelectItem value="sherwani">Sherwani</SelectItem>
                              <SelectItem value="kurta">Kurta Set</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={customOrderForm.control}
                        name="occasion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Occasion</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select occasion" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="wedding">Wedding</SelectItem>
                                <SelectItem value="festival">Festival</SelectItem>
                                <SelectItem value="party">Party</SelectItem>
                                <SelectItem value="casual">Casual Wear</SelectItem>
                                <SelectItem value="office">Office Wear</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={customOrderForm.control}
                        name="budgetRange"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Budget Range</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select budget" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="2000-5000">₹2,000 - ₹5,000</SelectItem>
                                <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                                <SelectItem value="10000-20000">₹10,000 - ₹20,000</SelectItem>
                                <SelectItem value="20000+">₹20,000+</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={customOrderForm.control}
                      name="designDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Design Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={4}
                              placeholder="Describe your design preferences, colors, patterns, style details..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <FormLabel>Reference Images</FormLabel>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer mt-2">
                        <CloudUpload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-accent">Drop images here or click to upload</p>
                        <p className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</p>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-white py-4 rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
                      disabled={customOrderMutation.isPending}
                    >
                      <Layers className="mr-2 h-4 w-4" />
                      {customOrderMutation.isPending ? "Submitting..." : "Submit Order Request"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Alteration Form */}
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-2xl font-display font-semibold text-primary">
                  Alteration Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...alterationForm}>
                  <form 
                    onSubmit={alterationForm.handleSubmit((data) => {
                      const formData = {
                        ...data,
                        alterationsNeeded: JSON.stringify(selectedAlterations)
                      };
                      alterationMutation.mutate(formData);
                    })}
                    className="space-y-6"
                  >
                    <FormField
                      control={alterationForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={alterationForm.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 98765 43210" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={alterationForm.control}
                      name="garmentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Garment Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select garment" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="saree-blouse">Saree Blouse</SelectItem>
                              <SelectItem value="lehenga">Lehenga</SelectItem>
                              <SelectItem value="salwar">Salwar Kameez</SelectItem>
                              <SelectItem value="dress">Western Dress</SelectItem>
                              <SelectItem value="shirt">Shirt/Kurta</SelectItem>
                              <SelectItem value="pants">Pants/Trousers</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <FormLabel>Alteration Needed *</FormLabel>
                      <div className="space-y-2 mt-2">
                        {alterationOptions.map((option) => (
                          <div key={option.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={option.id}
                              checked={selectedAlterations.includes(option.id)}
                              onCheckedChange={(checked) => handleAlterationChange(option.id, checked as boolean)}
                            />
                            <label htmlFor={option.id} className="text-accent cursor-pointer">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <FormField
                      control={alterationForm.control}
                      name="specialInstructions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Instructions</FormLabel>
                          <FormControl>
                            <Textarea 
                              rows={3}
                              placeholder="Any specific requirements or details..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={alterationForm.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-secondary text-white py-4 rounded-lg hover:bg-secondary/90 transition-colors font-medium text-lg"
                      disabled={alterationMutation.isPending}
                    >
                      <Scissors className="mr-2 h-4 w-4" />
                      {alterationMutation.isPending ? "Submitting..." : "Request Alteration"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
