'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function createProjectAction(prevState: any, formData: FormData) {
  const title = formData.get('title');
  const description = formData.get('description');
  const imageUrl = formData.get('imageUrl');
  const demoLink = formData.get('demoLink');
  const repoLink = formData.get('repoLink');
  const tagsString = formData.get('tags') as string;

  const tags = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);

  try {
    // TODO: Replace with your actual data storage logic
    console.log('Creating project:', { title, description, imageUrl, demoLink, repoLink, tags });
  } catch (error) {
    console.error('Error creating project:', error);
    return { message: 'Failed to create project' };
  }

  revalidatePath('/admin/projects');
  revalidatePath('/projects');
  redirect('/admin/projects');
}
