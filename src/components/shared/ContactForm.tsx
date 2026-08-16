'use client';

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

// Shared contact form that posts to /api/contact. Mirrors the submit logic used
// by the homepage ContactSection so both entry points behave identically.
export default function ContactForm() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none">Name</label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required className="bg-background/50" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none">Email</label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required className="bg-background/50" />
                </div>
            </div>
            <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium leading-none">Message</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Tell me about your project..."
                    required
                />
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11 text-base">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Message"}
            </Button>

            {status === "success" && (
                <p className="rounded-lg bg-green-500/10 py-2 text-center text-sm font-medium text-green-600">
                    Message sent successfully!
                </p>
            )}
            {status === "error" && (
                <p className="rounded-lg bg-red-500/10 py-2 text-center text-sm font-medium text-red-600">
                    Failed to send message. Please try again.
                </p>
            )}
        </form>
    );
}
