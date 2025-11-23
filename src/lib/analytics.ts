import { NextRequest } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/db';
import Visit from '@/lib/models/Visit';

export async function trackVisit(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex');
    const deviceType = request.headers.get('user-agent') || 'unknown';
    const pagePath = request.nextUrl.pathname;

    // Simple device type detection
    const isMobile = /mobile/i.test(deviceType);
    const simplifiedDeviceType = isMobile ? 'Mobile' : 'Desktop';

    await connectDB();
    
    // Check if visit exists for this IP and page within the last hour to avoid spam
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const existingVisit = await Visit.findOne({
      ipHash,
      pagePath,
      timestamp: { $gt: oneHourAgo },
    });

    if (!existingVisit) {
      await Visit.create({
        ipHash,
        deviceType: simplifiedDeviceType,
        pagePath,
      });
    }
  } catch (error) {
    console.error('Error tracking visit:', error);
    // Don't crash the app if analytics fail
  }
}
