"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { FileText, Edit, Trash2, Eye, Plus, Search, MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"
import api from "@/lib/api"

export default function BlogsListPage() {
    const [blogs, setBlogs] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        fetchBlogs()
    }, [])

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

    const deleteBlog = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return
        try {
            await api.delete(`/blogs/${id}`)
            setBlogs(blogs.filter(b => b.id !== id))
        } catch (error) {
            alert("Failed to delete blog")
        }
    }

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
                    <p className="text-muted-foreground text-sm mt-1">Create, edit, and manage your content</p>
                </div>
                <Link href="/admin/dashboard/blogs/new">
                    <Button size="lg" className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-lg shadow-violet-500/20 px-6 transition-all duration-300 transform hover:scale-[1.02]">
                        <Plus className="w-4 h-4 mr-2" /> Create New Post
                    </Button>
                </Link>
            </div>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl shadow-black/20">
                <CardHeader className="border-b border-border/50 pb-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CardTitle className="text-xl font-bold">All Articles</CardTitle>
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-sm transition-all"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted/30">
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Stats</th>
                                    <th className="px-6 py-4">Published Date</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {loading ? (
                                    <tr><td colSpan={5} className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-muted-foreground text-sm font-medium">Fetching blogs...</span>
                                        </div>
                                    </td></tr>
                                ) : filteredBlogs.length === 0 ? (
                                    <tr><td colSpan={5} className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                                                <FileText className="w-6 h-6 text-muted-foreground" />
                                            </div>
                                            <p className="text-muted-foreground">No blogs found.</p>
                                        </div>
                                    </td></tr>
                                ) : filteredBlogs.map((blog) => (
                                    <tr key={blog.id} className="group hover:bg-muted/30 transition-colors duration-200">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3 max-w-md">
                                                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0 border border-violet-500/20 group-hover:scale-110 transition-transform duration-300">
                                                    <FileText className="w-5 h-5 text-violet-400" />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <h3 className="font-semibold text-foreground truncate group-hover:text-violet-400 transition-colors">
                                                        {blog.title}
                                                    </h3>
                                                    <p className="text-xs text-muted-foreground truncate italic">/blogs/{blog.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ring-1 ring-inset ${blog.published ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20" : "bg-amber-500/10 text-amber-400 ring-amber-500/20"
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse ${blog.published ? "bg-emerald-400" : "bg-amber-400"}`} />
                                                {blog.published ? "Published" : "Draft"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-1.5">
                                                    <Eye className="w-4 h-4 text-violet-400/70" />
                                                    <span className="font-medium text-foreground">{blog.views || 0}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm font-medium text-foreground">
                                                {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex justify-end gap-1.5">
                                                <Link href={`/blogs/${blog.slug}`} target="_blank">
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-violet-500/10 hover:text-violet-400 transition-all">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/dashboard/blogs/edit/${blog.id}`}>
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-violet-500/10 hover:text-violet-400 transition-all">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-9 w-9 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all"
                                                    onClick={() => deleteBlog(blog.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
