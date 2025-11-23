import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-24">
            <div className="mx-auto max-w-4xl space-y-12">
                <div className="space-y-4 text-center">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About Me</h1>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        Passionate about creating intuitive and performant digital experiences.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">My Journey</h2>
                        <p className="text-muted-foreground">
                            I started my coding journey 5 years ago, fascinated by how lines of code could come to life.
                            Since then, I've worked with various startups and established companies, helping them build
                            scalable web applications.
                        </p>
                        <p className="text-muted-foreground">
                            My expertise lies in the JavaScript ecosystem, particularly React and Node.js. I love solving
                            complex problems and optimizing performance to ensure the best user experience.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold">Skills</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <Card>
                                <CardContent className="flex items-center justify-center p-6">
                                    <span className="font-medium">Frontend Development</span>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center justify-center p-6">
                                    <span className="font-medium">Backend Development</span>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center justify-center p-6">
                                    <span className="font-medium">UI/UX Design</span>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent className="flex items-center justify-center p-6">
                                    <span className="font-medium">Cloud Architecture</span>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
