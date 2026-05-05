import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';

if (typeof window === 'undefined') {
  const ws = require('ws');
  class CustomWebSocket extends ws {
    constructor(url: string | URL, protocols?: string | string[] | undefined, options?: any) {
      super(url, protocols, { ...options, family: 4 });
    }
  }
  neonConfig.webSocketConstructor = CustomWebSocket;
}

const connectionString = `${process.env.DATABASE_URL}`;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

let prisma: PrismaClient;

if (globalForPrisma.prisma) {
  prisma = globalForPrisma.prisma;
} else {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);
  prisma = new PrismaClient({ adapter, log: ['query'] });
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
  }
}

export { prisma };
