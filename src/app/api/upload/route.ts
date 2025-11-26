import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

async function isAuthenticated() {
  const token = (await cookies()).get('auth_token')?.value;
  return token && verifyToken(token);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads');
    
    // Ensure directory exists (node 10+ recursive mkdir)
    // Actually, let's assume public/uploads exists or create it manually via command if needed, 
    // but fs.writeFile won't create dirs. 
    // Better to use a try/catch block to create dir if not exists or just save to public root if simple.
    // Let's stick to public/uploads and I'll run a command to create it.
    
    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
