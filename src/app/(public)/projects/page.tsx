import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import connectDB from "@/lib/db";
import Project from "@/lib/models/Project";

export const dynamic = 'force-dynamic';

async function getProjects() {
    await connectDB();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return projects;
}

export default async function ProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="space-y-12">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">My Projects</h1>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        A collection of my recent work and experiments.
                    </p>
                </div>

                {projects.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-muted-foreground">No projects found. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {projects.map((project: any, index: number) => (
                            <Card key={project._id} className="flex flex-col overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 border-muted/50">
                                <div className="aspect-video w-full bg-muted relative overflow-hidden group">
                                    <div className="absolute inset-0 flex items-center justify-center bg-secondary text-secondary-foreground transition-transform duration-500 group-hover:scale-105">
                                        {project.imageUrl ? (
                                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </div>
                                </div>
                                <CardHeader>
                                    <CardTitle>{project.title}</CardTitle>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {project.tags.map((tag: string) => (
                                            <span key={tag} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <CardDescription className="line-clamp-3">
                                        {project.description}
                                    </CardDescription>
                                </CardContent>
                                <CardFooter className="flex gap-4">
                                    {project.demoLink && (
                                        <Button asChild variant="default" size="sm" className="flex-1">
                                            <Link href={project.demoLink} target="_blank" rel="noreferrer">
                                                <ExternalLink className="mr-2 h-4 w-4" /> Demo
                                            </Link>
                                        </Button>
                                    )}
                                    {project.repoLink && (
                                        <Button asChild variant="outline" size="sm" className="flex-1">
                                            <Link href={project.repoLink} target="_blank" rel="noreferrer">
                                                <Github className="mr-2 h-4 w-4" /> Code
                                            </Link>
                                        </Button>
                                    )}
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
