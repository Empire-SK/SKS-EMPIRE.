import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

async function isAuthenticated() {
  const token = (await cookies()).get('auth_token')?.value;
  return token && verifyToken(token);
}

export async function GET() {
  try {
    let profile = await prisma.profile.findUnique({
      where: { id: 'default-profile' }
    });

    if (!profile) {
      profile = await prisma.profile.findFirst();
    }
    return NextResponse.json(profile || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    // Remove id, createdAt, updatedAt from body if present to avoid errors
    const { id, createdAt, updatedAt, ...data } = body;

    const profile = await prisma.profile.upsert({
      where: { id: 'default-profile' }, // Assuming single profile
      update: data,
      create: { ...data, id: 'default-profile' },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
