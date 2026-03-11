"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import api from "@/lib/api"
import { ArrowRight, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSettingsStore } from "@/store/useSettingsStore"

function extractFirstImage(html: string): string | null {
    if (!html) return null;
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/);
    return match ? match[1] : null;
}

export default function Home() {
    const [blogs, setBlogs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const { settings, loading: settingsLoading } = useSettingsStore()

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await api.get("/blogs")
                setBlogs(response.data)
            } catch (error) {
                console.error("Failed to fetch blogs:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-violet-500/30">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-background/60 backdrop-blur-xl border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold tracking-tight">{settings.siteTitle}</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Link href="/admin/login">
                            <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-foreground">
                                Dashboard
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 text-center overflow-hidden">
                {/* Gradient orbs */}
                <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-violet-500/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-fuchsia-500/15 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-8">
                        <Sparkles className="w-3.5 h-3.5" />
                        Fresh stories, every week
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
                        Where Ideas Meet{" "}
                        <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                            Inspiration
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        {settings.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="rounded-full h-12 px-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-lg shadow-violet-500/25 text-white border-0" asChild>
                            <a href="#latest">
                                Start Reading <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full h-12 px-8 border-border/50 bg-background/50 backdrop-blur-sm">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </section>

            {/* Blog Cards Section */}
            <section id="latest" className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Latest Posts</h2>
                        <p className="text-muted-foreground text-sm mt-1">Discover fresh perspectives and insights</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        [1, 2, 3].map((i) => (
                            <div key={i} className="h-96 rounded-2xl bg-card animate-pulse border border-border/50" />
                        ))
                    ) : blogs.length === 0 ? (
                        <div className="col-span-full flex flex-col items-center py-20 text-center">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                <Sparkles className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground text-lg">No posts yet. Check back soon!</p>
                        </div>
                    ) : blogs.map((blog, index) => {
                        const thumbnail = extractFirstImage(blog.content);
                        return (
                            <Link key={blog.id} href={`/blogs/${blog.slug}`} className="group">
                                <Card className="h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-500 rounded-2xl">
                                    {/* Image */}
                                    <div className="h-52 bg-muted/50 relative overflow-hidden">
                                        {thumbnail ? (
                                            <img
                                                src={thumbnail}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 flex items-center justify-center">
                                                <span className="text-5xl font-bold text-violet-500/20">{blog.title[0]}</span>
                                            </div>
                                        )}
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>

                                    <CardHeader className="pb-2">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[10px] text-white font-bold">
                                                {(blog.author?.name || "A")[0]}
                                            </div>
                                            <span className="font-medium">{blog.author?.name || "Admin"}</span>
                                            <span className="text-border">•</span>
                                            <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <CardTitle className="text-lg leading-snug group-hover:text-violet-400 transition-colors duration-300">
                                            {blog.title}
                                        </CardTitle>
                                    </CardHeader>

                                    <CardContent className="pb-2">
                                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                            {blog.content.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').substring(0, 120)}...
                                        </p>
                                    </CardContent>

                                    <CardFooter className="pt-3">
                                        <span className="text-sm font-medium text-violet-400 group-hover:text-violet-300 flex items-center gap-1 transition-colors">
                                            Read article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </CardFooter>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border/50 py-12 px-4">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-semibold">{settings.siteTitle}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {settings.siteTitle}. All rights reserved.</p>
                </div>
            </footer>
        </main>
    )
}
