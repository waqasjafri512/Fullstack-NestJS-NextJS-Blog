import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
export declare class SettingsService implements OnModuleInit {
    private prisma;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
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
