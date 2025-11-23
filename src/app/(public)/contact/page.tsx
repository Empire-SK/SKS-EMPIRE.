import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="mx-auto max-w-5xl space-y-12">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get in Touch</h1>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        Have a project in mind? Let's discuss how we can work together.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-8">
                        <Card className="h-full border-muted/50 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                                <CardDescription>
                                    Feel free to reach out through any of these channels.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                                    <Mail className="h-6 w-6 text-primary" />
                                    <span className="text-lg">hello@example.com</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                                    <Phone className="h-6 w-6 text-primary" />
                                    <span className="text-lg">+1 (555) 000-0000</span>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                                    <MapPin className="h-6 w-6 text-primary" />
                                    <span className="text-lg">San Francisco, CA</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="border-muted/50 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle>Send a Message</CardTitle>
                            <CardDescription>
                                I'll get back to you as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                                        <Input id="name" placeholder="John Doe" required className="bg-background/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                                        <Input id="email" type="email" placeholder="john@example.com" required className="bg-background/50" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                                    <textarea
                                        id="message"
                                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Tell me about your project..."
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full h-11 text-base">Send Message</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
