"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import api from "@/lib/api"
import { ImagePlus, Save, Eye, ArrowLeft, Settings as SettingsIcon, Type, FileText } from "lucide-react"
import 'react-quill-new/dist/quill.snow.css'

// Dynamically import Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

export default function BlogEditor({ initialData }: { initialData?: any }) {
    const [title, setTitle] = useState(initialData?.title || "")
    const [content, setContent] = useState(initialData?.content || "")
    const [category, setCategory] = useState(initialData?.categoryId || "")
    const [categories, setCategories] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get("/categories")
                setCategories(response.data)
            } catch (error) {
                console.error("Failed to fetch categories:", error)
            }
        }
        fetchCategories()
    }, [])

    const handleSave = async () => {
        if (!title || !content) {
            alert("Title and content are required")
            return
        }

        setLoading(true)
        try {
            const payload = {
                title,
                content,
                categoryId: category || null,
                isPublished: true
            }

            if (initialData?.id) {
                await api.patch(`/blogs/${initialData.id}`, payload)
                alert("Blog updated successfully!")
            } else {
                await api.post("/blogs", payload)
                alert("Blog created successfully!")
            }
            router.push("/admin/dashboard/blogs")
        } catch (error: any) {
            console.error("Save error:", error)
            alert(error.response?.data?.message || "Failed to save blog")
        } finally {
            setLoading(false)
        }
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/images/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const data = response.data;
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            setContent((prev: string) => prev + `<p><img src="${apiUrl}${data.url}" alt="${file.name}" style="max-width: 100%; border-radius: 12px; margin-top: 16px; margin-bottom: 16px;" /></p>`);
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Image upload failed");
        }
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-6xl mx-auto">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl hover:bg-muted/50"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{initialData ? "Edit Article" : "Draft New Story"}</h1>
                        <p className="text-muted-foreground text-xs mt-0.5">
                            {initialData ? `Editing: ${initialData.slug}` : "Your ideas are taking shape"}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" className="flex-1 sm:flex-none rounded-xl border-border/50 bg-background/50 hover:bg-muted/50">
                        <Eye className="w-4 h-4 mr-2" /> Preview
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex-1 sm:flex-none rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-lg shadow-violet-500/20"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <><Save className="w-4 h-4 mr-2" /> {initialData ? "Update Story" : "Publish Story"}</>
                        )}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Editor Section */}
                <div className="lg:col-span-3 space-y-6 animate-slide-up">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl shadow-black/10">
                        <CardHeader className="border-b border-border/50 bg-muted/20 py-4">
                            <div className="flex items-center gap-2">
                                <Type className="w-4 h-4 text-violet-400" />
                                <CardTitle className="text-sm font-semibold uppercase tracking-wider">Article Details</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 sm:p-8 space-y-8">
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Article Title</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter a captivating title..."
                                        className="w-full text-3xl sm:text-4xl font-extrabold px-0 border-none focus:outline-none bg-transparent placeholder:text-muted-foreground/30 py-2"
                                    />
                                </div>
                                <div className="h-[500px] flex flex-col pt-4">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1 mb-3">Content Body</label>
                                    <div className="flex-1 rounded-xl overflow-hidden border border-border/30 bg-background/30 focus-within:ring-2 focus-within:ring-violet-500/30 transition-all">
                                        <ReactQuill
                                            theme="snow"
                                            value={content}
                                            onChange={setContent}
                                            className="h-full border-none editor-canvas"
                                            placeholder="Write your story here..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Sticky Section */}
                <div className="space-y-6 lg:sticky lg:top-24 h-fit animate-slide-up [animation-delay:100ms]">
                    <Card className="border-border/50 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg shadow-black/10">
                        <CardHeader className="border-b border-border/50 bg-muted/20 py-4">
                            <div className="flex items-center gap-2">
                                <SettingsIcon className="w-4 h-4 text-violet-400" />
                                <CardTitle className="text-sm font-semibold uppercase tracking-wider">Config</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-5 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Categorize</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full h-11 px-4 rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 text-sm transition-all appearance-none cursor-pointer"
                                >
                                    <option value="" className="bg-card">Untagged</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id} className="bg-card">
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Media</label>
                                <div className="relative group">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        id="image-upload"
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="image-upload"
                                        className="flex flex-col items-center justify-center gap-2 p-6 rounded-xl border-2 border-dashed border-border/40 bg-background/30 hover:bg-muted/30 hover:border-violet-500/40 cursor-pointer transition-all duration-300"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <ImagePlus className="w-5 h-5 text-violet-400" />
                                        </div>
                                        <span className="text-xs font-medium text-muted-foreground">Insert Image</span>
                                    </label>
                                </div>
                                <p className="text-[10px] text-muted-foreground px-1">Tip: Images are inserted at the end of the text. You can drag them around.</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Tips */}
                    <div className="p-5 rounded-2xl bg-violet-500/5 border border-violet-500/10">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-4 h-4 text-violet-400" />
                            <h4 className="text-xs font-bold uppercase tracking-wider text-violet-300">Quick Tips</h4>
                        </div>
                        <ul className="space-y-2">
                            <li className="text-[11px] text-muted-foreground leading-relaxed">• Use Heading 1 for main points</li>
                            <li className="text-[11px] text-muted-foreground leading-relaxed">• Blockquotes add emphasis</li>
                            <li className="text-[11px] text-muted-foreground leading-relaxed">• Keep paragraphs concise</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
