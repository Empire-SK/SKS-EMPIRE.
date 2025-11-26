'use client';

import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createProjectAction } from '@/actions/project-actions';

const initialState = {
    message: '',
};

export default function NewProjectPage() {
    const [state, formAction] = useFormState(createProjectAction, initialState);

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Project</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="title">Title</label>
                            <Input id="title" name="title" required />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="imageUrl">Image URL</label>
                            <Input id="imageUrl" name="imageUrl" placeholder="https://..." required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="demoLink">Demo Link</label>
                                <Input id="demoLink" name="demoLink" placeholder="https://..." />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="repoLink">Repo Link</label>
                                <Input id="repoLink" name="repoLink" placeholder="https://..." />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="tags">Tags (comma separated)</label>
                            <Input id="tags" name="tags" placeholder="React, Next.js, MongoDB" />
                        </div>

                        <Button type="submit" className="w-full">Create Project</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
