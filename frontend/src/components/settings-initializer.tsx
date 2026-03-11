"use client"

import { useEffect } from "react"
import { useSettingsStore } from "@/store/useSettingsStore"

export function SettingsInitializer() {
    const fetchSettings = useSettingsStore((state) => state.fetchSettings)

    useEffect(() => {
        fetchSettings()
    }, [fetchSettings])

    return null
}
