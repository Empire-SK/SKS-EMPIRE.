
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // 1. Seed Profile
    const profile = await prisma.profile.upsert({
        where: { id: 'default-profile' },
        update: {},
        create: {
            id: 'default-profile',
            name: 'Sabin K Santhosh',
            role: 'FULL STACK DEVELOPER',
            bio: "I'm Sabin K Santhosh. A creative developer focused on crafting immersive web experiences that leave a lasting impact.",
            about: "I don't just write code; I engineer solutions. I am passionate about learning and applying new technologies to solve real-world problems.",
            email: 'sabinksanthosh6@gmail.com', // Inferred from previous context
            phone: '',
            location: 'Kerala, IN',
            github: 'https://github.com/Empire-SK',
            linkedin: 'https://linkedin.com/in/sabin-k-santhosh/',
            imageUrl: '', // Can be updated by user
        },
    });
    console.log('Seeded Profile');

    // 2. Seed Timeline
    // Check if timeline is empty
    const timelineCount = await prisma.timelineItem.count();
    if (timelineCount === 0) {
        await prisma.timelineItem.createMany({
            data: [
                {
                    year: '2024', // Est. based on context or leave generic
                    title: 'Education Society Kerala',
                    role: 'IEEE Intern',
                    description: 'Contributed to educational initiatives and projects, enhancing community engagement.',
                    order: 1,
                },
                {
                    year: '2023', // Est.
                    title: 'College of Eng. Kidangoor',
                    role: 'Tech Coordinator',
                    description: 'Managed technical setups and ensured smooth execution of campus events.',
                    order: 2,
                },
            ],
        });
        console.log('Seeded Timeline');
    }

    // 3. Seed Skills
    const skillsCount = await prisma.skill.count();
    if (skillsCount === 0) {
        await prisma.skill.createMany({
            data: [
                { name: 'HTML/CSS', percentage: 90, category: 'Frontend', order: 1 },
                { name: 'React', percentage: 85, category: 'Frontend', order: 2 },
                { name: 'Node.js', percentage: 75, category: 'Backend', order: 3 },
            ],
        });
        console.log('Seeded Skills');
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
