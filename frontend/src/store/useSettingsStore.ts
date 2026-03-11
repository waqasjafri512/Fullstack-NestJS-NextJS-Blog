import { create } from 'zustand'
import api from '@/lib/api'

interface Settings {
    siteTitle: string
    description: string
    logo: string
    twitter: string
    github: string
    theme: string
    accentColor: string
    emailNotifications: boolean
    newsletterEnabled: boolean
}

interface SettingsState {
    settings: Settings
    loading: boolean
    fetchSettings: () => Promise<void>
}

export const useSettingsStore = create<SettingsState>((set) => ({
    settings: {
        siteTitle: "Jafri Blog",
        description: "A premium blog for developers, designers, and tech enthusiasts.",
        logo: "",
        twitter: "",
        github: "",
        theme: "light",
        accentColor: "#8b5cf6",
        emailNotifications: true,
        newsletterEnabled: true
    },
    loading: true,
    fetchSettings: async () => {
        try {
            const response = await api.get('/settings')
            set({ settings: response.data, loading: false })
        } catch (error) {
            console.error('Failed to fetch settings', error)
            set({ loading: false })
        }
    }
}))
