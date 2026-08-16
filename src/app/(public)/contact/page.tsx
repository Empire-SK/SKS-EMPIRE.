import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/shared/ContactForm";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Get in touch with Sabin K Santhosh for web development projects, collaborations, and freelance opportunities. Based in Kottayam, Kerala, India.",
    alternates: { canonical: "/contact" },
    openGraph: {
        title: "Contact | Sabin K Santhosh",
        description:
            "Get in touch for web development projects and collaborations.",
        url: "/contact",
    },
};

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
                                <a href="mailto:sabinksanthosh6@gmail.com" className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                                    <Mail className="h-6 w-6 text-primary" />
                                    <span className="text-lg break-all">sabinksanthosh6@gmail.com</span>
                                </a>
                                <a href="tel:+916282075284" className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                                    <Phone className="h-6 w-6 text-primary" />
                                    <span className="text-lg">+91 62820 75284</span>
                                </a>
                                <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50">
                                    <MapPin className="h-6 w-6 text-primary" />
                                    <span className="text-lg">Kottayam, Kerala, India</span>
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
                            <ContactForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
