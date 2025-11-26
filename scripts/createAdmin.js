const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdminUser() {
    try {
        // Default admin credentials
        const username = 'admin';
        const password = 'admin123'; // Change this to a secure password

        // Check if admin already exists
        const existingAdmin = await prisma.adminUser.findUnique({
            where: { username }
        });

        if (existingAdmin) {
            console.log('✅ Admin user already exists!');
            console.log(`Username: ${username}`);
            console.log('\n💡 Use these credentials to login:');
            console.log(`   Username: ${username}`);
            console.log(`   Password: ${password}`);
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create admin user
        const admin = await prisma.adminUser.create({
            data: {
                username,
                password: hashedPassword,
            }
        });

        console.log('✅ Admin user created successfully!');
        console.log('\n🔐 Login Credentials:');
        console.log(`   Username: ${username}`);
        console.log(`   Password: ${password}`);
        console.log('\n⚠️  IMPORTANT: Change the password after first login!');
        console.log('\n📍 Login at: http://localhost:3000/admin/login');
    } catch (error) {
        console.error('❌ Error creating admin user:', error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdminUser();
