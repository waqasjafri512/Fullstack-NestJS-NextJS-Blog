"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Mail, Download, Search, UserPlus, MoreHorizontal, CheckCircle2 } from "lucide-react"

export default function SubscribersPage() {
    const mockSubscribers = [
        { id: 1, email: "alex.johnson@example.com", name: "Alex Johnson", date: "2024-03-08", status: "Active" },
        { id: 2, email: "sarah.smith@design.io", name: "Sarah Smith", date: "2024-03-05", status: "Active" },
        { id: 3, email: "dev.mike@techhub.com", name: "Michael Chen", date: "2024-03-01", status: "Active" },
        { id: 4, email: "emma.watson@creative.com", name: "Emma Watson", date: "2024-02-28", status: "Pending" },
        { id: 5, email: "james.brown@agency.net", name: "James Brown", date: "2024-02-25", status: "Active" },
    ]

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Subscribers</h1>
                    <p className="text-muted-foreground text-sm mt-1">Manage your community and growth</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <Button variant="outline" className="flex-1 sm:flex-none rounded-xl border-border/50 bg-background/50">
                        <Download className="w-4 h-4 mr-2" /> Export CSV
                    </Button>
                    <Button className="flex-1 sm:flex-none rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-lg shadow-violet-500/20">
                        <UserPlus className="w-4 h-4 mr-2" /> Add Subscriber
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                    { label: "Total Subscribers", value: "1,284", change: "+12.5%", icon: Users, color: "text-violet-400" },
                    { label: "Active This Month", value: "142", change: "+8.2%", icon: CheckCircle2, color: "text-emerald-400" },
                    { label: "Conversion Rate", value: "3.4%", change: "+0.4%", icon: Mail, color: "text-blue-400" },
                ].map((stat, i) => (
                    <Card key={i} className="border-border/50 bg-card/50 rounded-2xl">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                                <div className="flex items-end gap-2">
                                    <p className="text-3xl font-extrabold tracking-tight">{stat.value}</p>
                                    <span className={`text-[10px] font-bold pb-1 ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                            <div className={`w-12 h-12 rounded-xl bg-muted/30 flex items-center justify-center ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Search and Table */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl shadow-black/10">
                <CardHeader className="border-b border-border/50 pb-6 px-6 sm:px-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <CardTitle className="text-lg font-bold">Audience List</CardTitle>
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Find a subscriber..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-sm transition-all"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground bg-muted/20">
                                    <th className="px-8 py-4">Subscriber</th>
                                    <th className="px-8 py-4">Joined Date</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/30">
                                {mockSubscribers.map((sub) => (
                                    <tr key={sub.id} className="group hover:bg-muted/20 transition-colors duration-200">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-[10px] text-white font-bold flex-shrink-0">
                                                    {sub.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="font-semibold text-foreground text-sm truncate">{sub.name}</p>
                                                    <p className="text-xs text-muted-foreground truncate">{sub.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-xs font-medium text-foreground">
                                                {new Date(sub.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ring-1 ring-inset ${sub.status === "Active" ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20" : "bg-amber-500/10 text-amber-400 ring-amber-500/20"
                                                }`}>
                                                {sub.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-8 py-4 border-t border-border/30 bg-muted/10 text-center">
                        <p className="text-[10px] text-muted-foreground italic font-medium">Viewing 5 of 1,284 subscribers</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
