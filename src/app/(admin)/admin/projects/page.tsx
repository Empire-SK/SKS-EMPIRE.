import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { revalidatePath } from "next/cache";

// Mock data - replace with your actual data source later
const mockProjects: any[] = [];

async function getProjects() {
    // TODO: Replace with your actual data fetching logic
    return mockProjects;
}

async function deleteProject(formData: FormData) {
    'use server';
    // TODO: Implement delete functionality with your data source
    const id = formData.get('id');
    revalidatePath('/admin/projects');
    revalidatePath('/projects');
}

export default async function AdminProjectsPage() {
    const projects = await getProjects();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Projects</h1>
                <Button asChild>
                    <Link href="/admin/projects/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Project
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {projects.map((project: any) => (
                    <Card key={project._id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-xl font-medium">
                                {project.title}
                            </CardTitle>
                            <form action={deleteProject}>
                                <input type="hidden" name="id" value={project._id.toString()} />
                                <Button variant="destructive" size="icon" type="submit">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </form>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground truncate">
                                {project.description}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
