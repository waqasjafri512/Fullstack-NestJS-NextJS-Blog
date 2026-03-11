import { Injectable, OnModuleInit } from '@nestjs/common';
import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SettingsService implements OnModuleInit {
    constructor(private prisma: PrismaService) { }

    async onModuleInit() {
        // Ensure singleton settings record exists
        await this.getSettings();
    }

    async getSettings() {
        let settings = await this.prisma.settings.findUnique({
            where: { id: 'singleton' },
        });

        if (!settings) {
            settings = await this.prisma.settings.create({
                data: { id: 'singleton' },
            });
        }
        return settings;
    }

    async updateSettings(data: any) {
        return this.prisma.settings.update({
            where: { id: 'singleton' },
            data: {
                siteTitle: data.siteTitle,
                description: data.description,
                logo: data.logo,
                twitter: data.twitter,
                github: data.github,
            },
        });
    }
}
