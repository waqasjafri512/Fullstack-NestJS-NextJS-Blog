"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/store/useAuth"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react"

export default function AdminLogin() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { login } = useAuth()
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            await login({ email, password })
            router.push("/admin/dashboard")
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid credentials")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex bg-background overflow-hidden">
            {/* Left - Decorative Panel */}
            <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative items-center justify-center bg-card">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-violet-500/15 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-fuchsia-500/10 rounded-full blur-[80px]" />
                </div>
                <div className="relative z-10 max-w-md text-center px-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-violet-500/20">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Welcome to Jafri</h2>
                    <p className="text-muted-foreground leading-relaxed">Manage your blog with a beautiful, modern dashboard. Create, edit, and publish your content effortlessly.</p>
                </div>
            </div>

            {/* Right - Login Form */}
            <div className="flex-1 flex items-center justify-center px-4 sm:px-8">
                <div className="w-full max-w-sm">
                    <div className="flex items-center gap-2.5 mb-8 lg:hidden">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold">Jafri</span>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight mb-1">Sign in</h1>
                    <p className="text-muted-foreground text-sm mb-8">Enter your credentials to access the dashboard</p>

                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/50 bg-card focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm transition-all"
                                    required />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-muted-foreground">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/50 bg-card focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm transition-all"
                                    required />
                            </div>
                        </div>

                        <Button type="submit" disabled={loading}
                            className="w-full h-11 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-md shadow-violet-500/20 font-semibold">
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Sign In <ArrowRight className="w-4 h-4 ml-1.5" /></>
                            )}
                        </Button>
                    </form>

                    <p className="text-sm text-center text-muted-foreground mt-6">
                        Don&apos;t have an account?{" "}
                        <Link href="/admin/register" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
