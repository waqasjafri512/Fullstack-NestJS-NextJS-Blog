"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save, Globe, Shield, Bell, Palette, Sparkles, Mail, Github, Twitter } from "lucide-react"
import api from "@/lib/api"

export default function SettingsPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [settings, setSettings] = useState({
        siteTitle: "",
        description: "",
        logo: "",
        twitter: "",
        github: ""
    })

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const response = await api.get("/settings")
            setSettings(response.data)
        } catch (error) {
            console.error("Failed to fetch settings", error)
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async () => {
        setSaving(true)
        try {
            await api.patch("/settings", settings)
            alert("Settings saved successfully!")
        } catch (error) {
            console.error("Failed to save settings", error)
            alert("Error saving settings")
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <div className="p-8 text-center">Loading Settings...</div>

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground text-sm mt-1">Configure your platform identity and preferences</p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0 shadow-lg shadow-violet-500/20"
                >
                    {saving ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Sidebar Nav */}
                <div className="space-y-1">
                    {[
                        { label: "General", icon: Globe, active: true },
                        { label: "Appearance", icon: Palette },
                        { label: "Security", icon: Shield },
                        { label: "Notifications", icon: Bell },
                    ].map((item, i) => (
                        <button key={i} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${item.active ? "bg-violet-500/10 text-violet-400 border border-violet-500/20 shadow-sm shadow-violet-500/10" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            }`}>
                            <item.icon className="w-4 h-4" />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Main Content Areas */}
                <div className="md:col-span-2 space-y-8 animate-slide-up">
                    {/* General Settings */}
                    <Card className="border-border/50 bg-card/50 rounded-2xl overflow-hidden shadow-xl shadow-black/10">
                        <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-violet-400" />
                                <CardTitle className="text-sm font-bold uppercase tracking-wider">General Information</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Site Title</label>
                                    <input
                                        type="text"
                                        value={settings.siteTitle}
                                        onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                                        className="w-full h-11 px-4 rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-sm font-medium transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">Description</label>
                                    <textarea
                                        rows={3}
                                        value={settings.description}
                                        onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-sm leading-relaxed transition-all resize-none"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Branding Section */}
                    <Card className="border-border/50 bg-card/50 rounded-2xl overflow-hidden shadow-xl shadow-black/10 transition-all hover:border-violet-500/20">
                        <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-violet-400" />
                                <CardTitle className="text-sm font-bold uppercase tracking-wider">Branding & Logo</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-6">
                                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                                    <Sparkles className="w-10 h-10 text-white" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="rounded-lg h-9 border-border/50 font-semibold text-xs transition-transform active:scale-95">Change Logo</Button>
                                        <Button variant="ghost" size="sm" className="rounded-lg h-9 text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 font-semibold text-xs transition-transform active:scale-95">Remove</Button>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground italic font-medium">Clear SVG or PNG recommended. Max size 2MB.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Social Profiles */}
                    <Card className="border-border/50 bg-card/50 rounded-2xl overflow-hidden shadow-xl shadow-black/10">
                        <CardHeader className="border-b border-border/50 bg-muted/20 pb-4">
                            <div className="flex items-center gap-2">
                                <Palette className="w-4 h-4 text-violet-400" />
                                <CardTitle className="text-sm font-bold uppercase tracking-wider">Social Connectivity</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group">
                                        <Twitter className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="twitter.com/username"
                                        value={settings.twitter || ""}
                                        onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                                        className="flex-1 h-11 px-4 rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-sm transition-all"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
                                        <Github className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="github.com/username"
                                        value={settings.github || ""}
                                        onChange={(e) => setSettings({ ...settings, github: e.target.value })}
                                        className="flex-1 h-11 px-4 rounded-xl border border-border/50 bg-background/50 focus:outline-none focus:ring-2 focus:ring-violet-500/30 text-sm transition-all"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Footer Info */}
                    <div className="pt-4 text-center">
                        <p className="text-[11px] text-muted-foreground font-medium">Platform version: 1.0.4-stable • System Up-to-date</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
