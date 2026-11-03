import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function isAuthenticated() {
  const token = (await cookies()).get('auth_token')?.value;
  return token && verifyToken(token);
}

export async function GET() {
  try {
    const timeline = await prisma.timelineItem.findMany({
      orderBy: [
        { isCurrent: 'desc' },
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });
    return NextResponse.json(timeline);
  } catch (error: any) {
    console.error('Failed to fetch timeline:', error);
    return NextResponse.json({ error: error?.message || 'Failed to fetch timeline' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized. Please login again.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const item = await prisma.timelineItem.create({
      data: {
        year: String(body.year || ''),
        title: String(body.title || ''),
        role: body.role ? String(body.role) : null,
        description: String(body.description || ''),
        isCurrent: Boolean(body.isCurrent),
        startDate: body.startDate ? String(body.startDate) : null,
        endDate: body.endDate ? String(body.endDate) : null,
        order: typeof body.order === 'number' ? body.order : (parseInt(body.order, 10) || 0),
      },
    });

    try {
      revalidatePath('/');
      revalidatePath('/about');
      revalidatePath('/admin/dashboard/timeline');
    } catch (e) {
      console.warn('Revalidation notice:', e);
    }

    return NextResponse.json(item);
  } catch (error: any) {
    console.error('Failed to create timeline item:', error);
    return NextResponse.json({ error: error?.message || 'Failed to create timeline item' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized. Please login again.' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, createdAt, updatedAt, ...rest } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing entry ID' }, { status: 400 });
    }

    const dataToUpdate: any = {};
    if (rest.year !== undefined) dataToUpdate.year = String(rest.year);
    if (rest.title !== undefined) dataToUpdate.title = String(rest.title);
    if (rest.role !== undefined) dataToUpdate.role = rest.role ? String(rest.role) : null;
    if (rest.description !== undefined) dataToUpdate.description = String(rest.description);
    if (rest.isCurrent !== undefined) dataToUpdate.isCurrent = Boolean(rest.isCurrent);
    if (rest.startDate !== undefined) dataToUpdate.startDate = rest.startDate ? String(rest.startDate) : null;
    if (rest.endDate !== undefined) dataToUpdate.endDate = rest.endDate ? String(rest.endDate) : null;
    if (rest.order !== undefined) {
      dataToUpdate.order = typeof rest.order === 'number' ? rest.order : (parseInt(rest.order, 10) || 0);
    }

    const item = await prisma.timelineItem.update({
      where: { id },
      data: dataToUpdate,
    });

    try {
      revalidatePath('/');
      revalidatePath('/about');
      revalidatePath('/admin/dashboard/timeline');
    } catch (e) {
      console.warn('Revalidation notice:', e);
    }

    return NextResponse.json(item);
  } catch (error: any) {
    console.error('Failed to update timeline item:', error);
    return NextResponse.json({ error: error?.message || 'Failed to update timeline item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized. Please login again.' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
    }

    await prisma.timelineItem.delete({
      where: { id },
    });

    try {
      revalidatePath('/');
      revalidatePath('/about');
      revalidatePath('/admin/dashboard/timeline');
    } catch (e) {
      console.warn('Revalidation notice:', e);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Failed to delete timeline item:', error);
    return NextResponse.json({ error: error?.message || 'Failed to delete timeline item' }, { status: 500 });
  }
}
