"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import api from "@/lib/api"
import { FileText, Eye, TrendingUp, Plus, Edit3, Trash2, ArrowRight } from "lucide-react"

export default function DashboardPage() {
    const [blogs, setBlogs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get("/blogs").then((res) => {
            setBlogs(res.data)
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [])

    const totalViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0)

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return
        try {
            await api.delete(`/blogs/${id}`)
            setBlogs(blogs.filter((b) => b.id !== id))
        } catch (err) {
            alert("Failed to delete")
        }
    }

    const stats = [
        { label: "Total Posts", value: blogs.length, icon: FileText, color: "from-violet-500 to-fuchsia-500" },
        { label: "Total Views", value: totalViews, icon: Eye, color: "from-blue-500 to-cyan-500" },
        { label: "This Month", value: blogs.filter(b => new Date(b.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length, icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
    ]

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-full overflow-hidden">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground text-sm mt-1">Welcome back! Here&apos;s your blog overview.</p>
                </div>
                <Link href="/admin/dashboard/blogs/new">
                    <Button className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-md shadow-violet-500/20">
                        <Plus className="w-4 h-4 mr-2" /> Create Post
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.label} className="border-border/50 bg-card/50 rounded-2xl overflow-hidden relative">
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.color}`} />
                        <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                                    <p className="text-3xl font-bold mt-1 tracking-tight">
                                        {loading ? "..." : stat.value}
                                    </p>
                                </div>
                                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                    <stat.icon className="w-5 h-5 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Posts */}
            <Card className="border-border/50 bg-card/50 rounded-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <CardTitle className="text-lg font-semibold">Recent Posts</CardTitle>
                    <Link href="/admin/dashboard/blogs">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground rounded-lg">
                            View all <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                    {loading ? (
                        <div className="px-6 pb-6 space-y-3">
                            {[1, 2, 3].map(i => <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />)}
                        </div>
                    ) : blogs.length === 0 ? (
                        <div className="px-6 pb-8 text-center">
                            <p className="text-muted-foreground text-sm">No posts yet. Create your first post to get started!</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-border/50">
                            {blogs.slice(0, 5).map((blog) => (
                                <div key={blog.id} className="flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors">
                                    <div className="flex-1 min-w-0 mr-4">
                                        <h3 className="text-sm font-semibold truncate">{blog.title}</h3>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                            <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                            <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{blog.views || 0}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${blog.published ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                                                {blog.published ? "Published" : "Draft"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Link href={`/admin/dashboard/blogs/edit/${blog.id}`}>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-violet-400">
                                                <Edit3 className="w-3.5 h-3.5" />
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-red-400"
                                            onClick={() => handleDelete(blog.id)}>
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
