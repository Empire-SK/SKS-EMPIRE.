const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config({ path: '.env' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is missing in .env');
    process.exit(1);
}

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to DB');

        const email = 'admin@portfolio.com';
        const password = 'admin123';
        const passwordHash = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Admin user already exists');
            existingUser.passwordHash = passwordHash;
            existingUser.role = 'admin';
            await existingUser.save();
            console.log('Admin password updated');
        } else {
            await User.create({
                email,
                passwordHash,
                role: 'admin',
            });
            console.log('Admin user created');
        }

        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
    } catch (error) {
        console.error('Error seeding admin:', error);
    } finally {
        await mongoose.disconnect();
    }
}

seed();
