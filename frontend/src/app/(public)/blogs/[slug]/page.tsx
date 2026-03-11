"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import api from "@/lib/api"
import { ArrowLeft, Clock, Eye, Calendar, Share2, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSettingsStore } from "@/store/useSettingsStore"

function estimateReadingTime(html: string): number {
    const text = html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ');
    const words = text.split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
}

export default function BlogDetail() {
    const params = useParams()
    const slug = params?.slug as string
    const [blog, setBlog] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const { settings } = useSettingsStore()

    useEffect(() => {
        if (!slug) return
        const fetchBlog = async () => {
            try {
                const response = await api.get(`/blogs/${slug}`)
                setBlog(response.data)
            } catch (err: any) {
                setError("Blog not found")
            } finally {
                setLoading(false)
            }
        }
        fetchBlog()
    }, [slug])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-muted-foreground text-sm">Loading article...</span>
                </div>
            </div>
        )
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-[#0a0a0a] text-white">
                <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
                    <span className="text-3xl">📄</span>
                </div>
                <h1 className="text-2xl font-bold">Article Not Found</h1>
                <p className="text-muted-foreground max-w-md text-center">The article you&apos;re looking for doesn&apos;t exist or may have been removed.</p>
                <Link href="/">
                    <Button variant="outline" className="rounded-full px-6">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                    </Button>
                </Link>
            </div>
        )
    }

    const readingTime = estimateReadingTime(blog.content);
    const publishDate = new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    // Fix for non-breaking spaces that break word wrapping
    const sanitizedContent = blog.content.replace(/\u00A0/g, ' ');

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-violet-500/30">
            {/* Sticky Nav */}
            <nav className="sticky top-0 z-50 bg-background/60 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Stories
                    </Link>
                    <div className="hidden sm:flex items-center gap-2">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center border border-white/10 shadow-lg">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-bold tracking-tight">{settings.siteTitle}</span>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/50"
                            onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link copied!"); }}>
                            <Share2 className="w-4 h-4 mr-2" /> Share
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Article Content */}
            <article className="relative w-full max-w-[840px] mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-20 overflow-hidden">
                {/* Global Gradient Orbs */}
                <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
                <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

                {/* Header Section */}
                <header className="text-center mb-16 space-y-8 animate-fade-in relative z-10">
                    {blog.category && (
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-widest">
                            <Sparkles className="w-3.5 h-3.5" />
                            {blog.category.name}
                        </div>
                    )}

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-foreground">
                        {blog.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-primary/20">
                                {(blog.author?.name || "A")[0].toUpperCase()}
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-foreground text-base leading-tight">{blog.author?.name || "Admin"}</p>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Author</p>
                            </div>
                        </div>
                        <div className="h-4 w-px bg-white/10 hidden sm:block" />
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-violet-400" />{publishDate}</div>
                        <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-violet-400" />{readingTime} min read</div>
                        <div className="flex items-center gap-2"><Eye className="w-4 h-4 text-violet-400" />{blog.views || 0} views</div>
                    </div>
                </header>

                {/* Main Content Area */}
                <div className="relative group/article z-10">
                    <div
                        className="
                            relative z-10
                            prose prose-xl prose-invert max-w-none
                            prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground
                            prose-h2:text-3xl sm:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:border-b prose-h2:pb-4 prose-h2:border-border
                            prose-h3:text-2xl sm:prose-h3:text-3xl prose-h3:mt-12
                            prose-p:leading-[1.9] prose-p:text-muted-foreground prose-p:mb-8 prose-p:text-lg sm:prose-p:text-xl
                            prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-a:font-bold
                            prose-img:rounded-[2rem] prose-img:shadow-2xl prose-img:mx-auto prose-img:my-16 prose-img:max-w-full prose-img:h-auto prose-img:border prose-img:border-border
                            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-accent/30 prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-r-[2rem] prose-blockquote:not-italic prose-blockquote:font-bold prose-blockquote:text-2xl prose-blockquote:text-foreground prose-blockquote:my-12
                            prose-strong:text-foreground prose-strong:font-black
                            prose-code:bg-accent prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:text-sm prose-code:text-primary
                            prose-li:text-muted-foreground prose-li:text-lg sm:prose-li:text-xl prose-li:mb-2
                            prose-ol:my-8 prose-ul:my-8
                            [&_img]:!max-w-full [&_img]:!h-auto [&_*]:max-w-full overflow-wrap-anywhere break-words
                        "
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />
                </div>

                {/* Footer Section */}
                <div className="mt-24 pt-16 border-t border-white/10 space-y-16 relative z-10">
                    {/* Author Section */}
                    <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-8 hover:bg-white/[0.05] transition-all duration-500 group">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-3xl shadow-2xl group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                            {(blog.author?.name || "A")[0].toUpperCase()}
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">About the author</p>
                                <h3 className="text-2xl font-black text-foreground">{blog.author?.name || "Admin"}</h3>
                            </div>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                Curating the best stories in technology, design, and creative culture. Passionate about building experiences that matter.
                            </p>
                            <div className="flex items-center justify-center sm:justify-start gap-4 pt-2">
                                <Button variant="outline" size="sm" className="rounded-full bg-transparent border-border hover:bg-accent text-xs font-bold px-6">Follow Author</Button>
                                <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-foreground text-xs font-bold">More Stories</Button>
                            </div>
                        </div>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="relative p-10 sm:p-16 rounded-[3rem] bg-gradient-to-br from-violet-600/20 via-transparent to-fuchsia-600/20 border border-violet-500/20 text-center overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sparkles className="w-32 h-32" />
                        </div>
                        <div className="relative z-10 max-w-lg mx-auto space-y-8">
                            <div className="space-y-2">
                                <h3 className="text-3xl sm:text-4xl font-black text-foreground italic">Stay Curious.</h3>
                                <p className="text-muted-foreground text-lg">Join 2,000+ readers and get our weekly newsletter focused on modern digital culture.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="your-best@email.com"
                                    className="flex-1 px-8 h-14 rounded-2xl border border-border bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all font-medium"
                                />
                                <Button className="h-14 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground border-0 font-black tracking-tight text-lg shadow-xl shadow-primary/20 active:scale-95 transition-all">
                                    Subscribe Now
                                </Button>
                            </div>
                            <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-widest leading-loose">No spam. Only high-quality content. Unsubscribe anytime.</p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}
