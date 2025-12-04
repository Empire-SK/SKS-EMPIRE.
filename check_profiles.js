const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const profiles = await prisma.profile.findMany();
    console.log('Profiles found:', profiles.length);
    profiles.forEach(p => {
        console.log(`ID: ${p.id}, Name: ${p.name}, ImageUrl: ${p.imageUrl}`);
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
