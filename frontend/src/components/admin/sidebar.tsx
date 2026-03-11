"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/store/useAuth"
import { LayoutDashboard, FileText, Users, Settings, LogOut, Sparkles, Plus } from "lucide-react"

const navItems = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/dashboard/blogs", icon: FileText, label: "Posts" },
    { href: "/admin/dashboard/subscribers", icon: Users, label: "Subscribers" },
    { href: "/admin/dashboard/settings", icon: Settings, label: "Settings" },
]

export default function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { logout } = useAuth()

    const handleLogout = () => {
        logout()
        router.push("/admin/login")
    }

    return (
        <aside className="w-[260px] min-h-screen bg-card border-r border-border/50 flex flex-col">
            {/* Logo */}
            <div className="px-5 py-6 border-b border-border/50">
                <Link href="/admin/dashboard" className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-md">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <span className="text-base font-bold tracking-tight">Jafri</span>
                        <span className="text-[10px] text-muted-foreground ml-1.5 font-medium uppercase tracking-wider">Admin</span>
                    </div>
                </Link>
            </div>

            {/* New Post Button */}
            <div className="px-4 pt-5 pb-2">
                <Link href="/admin/dashboard/blogs/new">
                    <button className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-sm font-semibold shadow-md shadow-violet-500/20 transition-all duration-200">
                        <Plus className="w-4 h-4" /> New Post
                    </button>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname?.startsWith(item.href))
                    return (
                        <Link key={item.href} href={item.href}>
                            <div className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                                ${isActive
                                    ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                }
                            `}>
                                <item.icon className="w-4 h-4 flex-shrink-0" />
                                {item.label}
                            </div>
                        </Link>
                    )
                })}
            </nav>

            {/* Bottom Section */}
            <div className="px-3 py-4 border-t border-border/50">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
                >
                    <LogOut className="w-4 h-4" />
                    Log Out
                </button>
            </div>
        </aside>
    )
}
