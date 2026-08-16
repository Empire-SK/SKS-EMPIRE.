import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Layout, Smartphone, Globe, Cpu, Layers, Database, type LucideIcon } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
    title: "Services",
    description:
        "Web development, UI/UX design, mobile apps, and backend solutions by Sabin K Santhosh — building fast, scalable, SEO-friendly digital products with Next.js and React.",
    alternates: { canonical: "/services" },
    openGraph: {
        title: "Services | Sabin K Santhosh",
        description:
            "Web development, UI/UX design, and backend solutions built with modern web technologies.",
        url: "/services",
    },
};

// ISR: regenerate at most once per minute; falls back to defaults if DB is down/empty.
export const revalidate = 60;

// Maps the lucide icon name stored on each Service row to its component.
const ICON_MAP: Record<string, LucideIcon> = {
    Globe, Layout, Smartphone, Code, Cpu, Layers, Database,
};

async function getServices(): Promise<any[]> {
    try {
        const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
        if (services.length > 0) return services;
    } catch (error) {
        console.error("Failed to fetch services, using fallback:", error);
    }
    return [
        { id: "1", title: "Web Development", description: "Building fast, responsive, and SEO-friendly websites using modern frameworks like Next.js.", icon: "Globe" },
        { id: "2", title: "UI/UX Design", description: "Designing intuitive and visually appealing interfaces that prioritize user experience.", icon: "Layout" },
        { id: "3", title: "Tech Strategy", description: "System architecture, performance audits, and scalability planning for ambitious products.", icon: "Cpu" },
    ];
}

export default async function ServicesPage() {
    const services = await getServices();

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
                    {services.map((service) => {
                        const Icon = ICON_MAP[service.icon] || Globe;
                        return (
                            <Card key={service.id} className="transition-all hover:shadow-lg">
                                <CardHeader>
                                    <Icon className="h-10 w-10 text-primary mb-4" />
                                    <CardTitle>{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-base">
                                        {service.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
