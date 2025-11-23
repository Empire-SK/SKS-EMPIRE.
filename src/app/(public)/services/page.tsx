import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Layout, Smartphone, Globe } from "lucide-react";

const services = [
    {
        title: "Web Development",
        description: "Building fast, responsive, and SEO-friendly websites using modern frameworks like Next.js.",
        icon: Globe,
    },
    {
        title: "Mobile App Development",
        description: "Creating native-like mobile experiences with React Native and cross-platform technologies.",
        icon: Smartphone,
    },
    {
        title: "UI/UX Design",
        description: "Designing intuitive and visually appealing interfaces that prioritize user experience.",
        icon: Layout,
    },
    {
        title: "Backend Solutions",
        description: "Developing robust APIs and scalable database architectures for your applications.",
        icon: Code,
    },
];

export default function ServicesPage() {
    return (
        <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-5xl space-y-12">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Services</h1>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        Comprehensive solutions tailored to your digital needs.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                    {services.map((service, index) => (
                        <Card key={index} className="transition-all hover:shadow-lg">
                            <CardHeader>
                                <service.icon className="h-10 w-10 text-primary mb-4" />
                                <CardTitle>{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    {service.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
