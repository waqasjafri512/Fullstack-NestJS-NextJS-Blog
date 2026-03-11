"use client"

import BlogEditor from "@/components/admin/blog-editor"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import api from "@/lib/api"

export default function EditBlogPage() {
    const params = useParams()
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await api.get(`/blogs/${params.id}`)
                setBlog(response.data)
            } catch (error) {
                console.error("Failed to fetch blog:", error)
            } finally {
                setLoading(false)
            }
        }
        if (params.id) fetchBlog()
    }, [params.id])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-muted-foreground text-sm">Loading story data...</span>
                </div>
            </div>
        )
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background">
                <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
                    <span className="text-3xl">📄</span>
                </div>
                <h1 className="text-2xl font-bold">Story Not Found</h1>
                <p className="text-muted-foreground max-w-md text-center">We couldn&apos;t find the story you&apos;re looking to edit.</p>
            </div>
        )
    }

    return <BlogEditor initialData={blog} />
}
