const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    await prisma.profile.updateMany({
        data: {
            bio: "I'm Sabin K Santhosh. Engineering the digital frontier with elegant code and scalable architectures."
        }
    });
    console.log("Bio updated");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
