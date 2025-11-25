'use server';

import { redirect } from 'next/navigation';
import { setAuthCookie } from '@/lib/auth';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please provide both email and password.' };
  }

  try {
    // TODO: Replace with your actual authentication logic
    // For now, this is a simple hardcoded check
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@example.com';
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return { error: 'Invalid credentials.' };
    }

    // Generate token and set cookie
    const token = await import('@/lib/auth').then((mod) =>
      mod.signToken({ userId: 'admin', email: email, role: 'admin' })
    );
    
    await setAuthCookie(token);
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Something went wrong. Please try again.' };
  }

  redirect('/admin/dashboard');
}
