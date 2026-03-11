import { SettingsService } from './settings.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getSettings(): Promise<{
        id: string;
        updatedAt: Date;
        siteTitle: string;
        description: string;
        logo: string | null;
        twitter: string | null;
        github: string | null;
        theme: string;
        accentColor: string;
        emailNotifications: boolean;
        newsletterEnabled: boolean;
    }>;
    updateSettings(data: any): Promise<{
        id: string;
        updatedAt: Date;
        siteTitle: string;
        description: string;
        logo: string | null;
        twitter: string | null;
        github: string | null;
        theme: string;
        accentColor: string;
        emailNotifications: boolean;
        newsletterEnabled: boolean;
    }>;
}
