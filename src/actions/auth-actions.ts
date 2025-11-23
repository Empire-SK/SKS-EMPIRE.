'use server';

import { redirect } from 'next/navigation';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { comparePassword, setAuthCookie } from '@/lib/auth';

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please provide both email and password.' };
  }

  try {
    await connectDB();
    const user = await User.findOne({ email });

    if (!user) {
      return { error: 'Invalid credentials.' };
    }

    const isMatch = await comparePassword(password, user.passwordHash);

    if (!isMatch) {
      return { error: 'Invalid credentials.' };
    }

    // Only allow admin login
    if (user.role !== 'admin') {
      return { error: 'Access denied. Admins only.' };
    }

    // Generate token and set cookie
    const token = await import('@/lib/auth').then((mod) =>
      mod.signToken({ userId: user._id, email: user.email, role: user.role })
    );
    
    await setAuthCookie(token);
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'Something went wrong. Please try again.' };
  }

  redirect('/admin/dashboard');
}
