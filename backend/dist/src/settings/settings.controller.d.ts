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
    }>;
    updateSettings(data: any): Promise<{
        id: string;
        updatedAt: Date;
        siteTitle: string;
        description: string;
        logo: string | null;
        twitter: string | null;
        github: string | null;
    }>;
}
