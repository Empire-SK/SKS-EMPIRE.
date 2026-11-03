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
    const timeline = await prisma.timelineItem.findMany({
      orderBy: [
        { isCurrent: 'desc' },
        { order: 'asc' },
        { createdAt: 'desc' },
      ],
    });
    return NextResponse.json(timeline);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch timeline' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const item = await prisma.timelineItem.create({
      data: {
        year: body.year,
        title: body.title,
        role: body.role,
        description: body.description,
        isCurrent: Boolean(body.isCurrent),
        startDate: body.startDate || null,
        endDate: body.endDate || null,
        order: typeof body.order === 'number' ? body.order : (parseInt(body.order, 10) || 0),
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create timeline item' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, createdAt, updatedAt, ...data } = body;
    if (data.order !== undefined) {
      data.order = typeof data.order === 'number' ? data.order : (parseInt(data.order, 10) || 0);
    }
    if (data.isCurrent !== undefined) {
      data.isCurrent = Boolean(data.isCurrent);
    }
    const item = await prisma.timelineItem.update({
      where: { id },
      data,
    });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update timeline item' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete timeline item' }, { status: 500 });
  }
}
