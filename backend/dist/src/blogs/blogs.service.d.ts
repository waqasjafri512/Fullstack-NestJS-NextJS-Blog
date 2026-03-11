import { PrismaService } from '../prisma/prisma.service';
export declare class BlogsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any, authorId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        content: string;
        thumbnail: string | null;
        published: boolean;
        views: number;
        authorId: string;
        categoryId: string | null;
    }>;
    findAll(): Promise<({
        category: {
            id: string;
            name: string;
        } | null;
        author: {
            id: string;
            name: string | null;
            email: string;
            password: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
        tags: {
            id: string;
            name: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        content: string;
        thumbnail: string | null;
        published: boolean;
        views: number;
        authorId: string;
        categoryId: string | null;
    })[]>;
    findOne(id: string): Promise<{
        category: {
            id: string;
            name: string;
        } | null;
        author: {
            id: string;
            name: string | null;
            email: string;
            password: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
        tags: {
            id: string;
            name: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        content: string;
        thumbnail: string | null;
        published: boolean;
        views: number;
        authorId: string;
        categoryId: string | null;
    }>;
    findBySlug(slug: string): Promise<{
        category: {
            id: string;
            name: string;
        } | null;
        author: {
            id: string;
            name: string | null;
            email: string;
            password: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
        tags: {
            id: string;
            name: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        content: string;
        thumbnail: string | null;
        published: boolean;
        views: number;
        authorId: string;
        categoryId: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        content: string;
        thumbnail: string | null;
        published: boolean;
        views: number;
        authorId: string;
        categoryId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        slug: string;
        content: string;
        thumbnail: string | null;
        published: boolean;
        views: number;
        authorId: string;
        categoryId: string | null;
    }>;
}
