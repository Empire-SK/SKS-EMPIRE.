import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
    title: "About",
    description:
        "Learn about Sabin K Santhosh — a Full Stack Developer and Digital Architect based in Kerala, India, specializing in React, Next.js, and scalable web applications.",
    alternates: { canonical: "/about" },
    openGraph: {
        title: "About | Sabin K Santhosh",
        description:
            "Full Stack Developer and Digital Architect based in Kerala, India.",
        url: "/about",
    },
};

// ISR: regenerate at most once per minute; falls back to seed data if DB is down.
export const revalidate = 60;

async function getAboutData(): Promise<{ profile: any; timeline: any[]; skills: any[] }> {
    try {
        let profile = await prisma.profile.findUnique({ where: { id: "default-profile" } });
        if (!profile) profile = await prisma.profile.findFirst();

        const timeline = await prisma.timelineItem.findMany({ orderBy: { order: "asc" } });
        const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } });

        return {
            profile: profile || {},
            timeline: timeline || [],
            skills: skills || [],
        };
    } catch (error) {
        console.error("Failed to fetch about data, using fallback:", error);
        return {
            profile: {
                name: "Sabin K Santhosh",
                role: "Full Stack Developer",
                about: "I don't just write code; I engineer solutions. I am passionate about learning and applying new technologies to solve real-world problems.",
                location: "Kerala, IN",
            },
            timeline: [
                { id: "1", year: "2024", title: "Education Society Kerala", role: "IEEE Intern", description: "Contributed to educational initiatives and projects, enhancing community engagement." },
                { id: "2", year: "2023", title: "College of Eng. Kidangoor", role: "Tech Coordinator", description: "Managed technical setups and ensured smooth execution of campus events." },
            ],
            skills: [
                { id: "1", name: "HTML/CSS", percentage: 90 },
                { id: "2", name: "React", percentage: 85 },
                { id: "3", name: "Node.js", percentage: 75 },
            ],
        };
    }
}

export default async function AboutPage() {
    const { profile, timeline, skills } = await getAboutData();
    const name = profile?.name || "Sabin K Santhosh";

    return (
        <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-4xl space-y-12">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About {name}</h1>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        {profile?.role || "Full Stack Developer"}
                        {profile?.location ? ` · ${profile.location}` : ""}
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">My Journey</h2>
                        {profile?.about && (
                            <p className="text-muted-foreground">{profile.about}</p>
                        )}

                        {timeline.length > 0 && (
                            <ul className="space-y-4 border-l border-muted pl-6">
                                {timeline.map((item) => (
                                    <li key={item.id} className="relative">
                                        <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" />
                                        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                                            {item.year}
                                        </p>
                                        <h3 className="font-semibold">
                                            {item.role ? `${item.role} · ${item.title}` : item.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{item.description}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">Skills</h2>
                        {skills.length > 0 ? (
                            <div className="space-y-4">
                                {skills.map((skill) => (
                                    <Card key={skill.id}>
                                        <CardContent className="p-4">
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="font-medium">{skill.name}</span>
                                                {typeof skill.percentage === "number" && (
                                                    <span className="text-sm text-muted-foreground">{skill.percentage}%</span>
                                                )}
                                            </div>
                                            {typeof skill.percentage === "number" && (
                                                <div className="h-1.5 w-full rounded-full bg-muted">
                                                    <div
                                                        className="h-1.5 rounded-full bg-primary"
                                                        style={{ width: `${skill.percentage}%` }}
                                                    />
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">Skills coming soon.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
