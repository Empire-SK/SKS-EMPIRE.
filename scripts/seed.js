const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
require('dotenv').config();

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

async function main() {
    // 1. Create Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.adminUser.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: hashedPassword,
        },
    });
    console.log({ admin });

    // 2. Create Profile
    const profile = await prisma.profile.upsert({
        where: { id: 'default-profile' }, // We'll need to handle single profile logic in app
        update: {},
        create: {
            name: 'Sabin K Santhosh',
            role: 'Full Stack Developer',
            bio: 'Building digital empires with modern web technologies.',
            about: "I don't just write code; I engineer solutions. I am passionate about learning and applying new technologies to solve real-world problems. My expertise spans the full stack, but my heart lies in creating intuitive, visually striking front-end experiences.",
            email: 'sabin@example.com',
            phone: '+91 6282526760',
            location: 'Kottayam, Kerala',
            github: 'https://github.com/Empire-SK',
            linkedin: 'https://linkedin.com/in/sabin-k-santhosh/',
        },
    });
    console.log({ profile });

    // 3. Create Projects
    const projects = [
        {
            title: 'E-Commerce Dashboard',
            category: 'Web Application',
            imageColor: 'bg-zinc-800',
            description: 'A comprehensive dashboard for managing online stores, featuring real-time analytics and inventory management.',
        },
        {
            title: 'AI Chat Interface',
            category: 'AI / Machine Learning',
            imageColor: 'bg-[#D0202F]',
            description: 'Modern chat UI integrated with OpenAI API, featuring streaming responses and code syntax highlighting.',
        },
    ];

    for (const p of projects) {
        await prisma.project.create({ data: p });
    }

    // 4. Create Services
    const services = [
        {
            title: 'Web Development',
            description: 'Building blazing fast, SEO-friendly websites using modern frameworks.',
            icon: 'Globe',
        },
        {
            title: 'UI/UX Design',
            description: 'Designing intuitive and engaging user interfaces.',
            icon: 'Layers',
        },
    ];

    for (const s of services) {
        await prisma.service.create({ data: s });
    }

    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
