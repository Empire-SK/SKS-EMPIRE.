import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Create a transporter using SMTP
        // Note: In a real production environment, these should be environment variables.
        // For this implementation, we will use the user's provided credentials or placeholders.
        // Since I cannot set env vars for the user, I will use process.env and expect the user to set them.
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Send mail
        await transporter.sendMail({
            from: `"${name}" <${process.env.SMTP_USER}>`, // sender address
            to: process.env.SMTP_USER, // list of receivers (sending to self)
            replyTo: email,
            subject: `Portfolio Contact: ${name}`, // Subject line
            text: message, // plain text body
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `, // html body
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
