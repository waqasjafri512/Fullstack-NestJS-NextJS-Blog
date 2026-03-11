import { BlogsService } from './blogs.service';
export declare class BlogsController {
    private readonly blogsService;
    constructor(blogsService: BlogsService);
    create(createBlogDto: any, req: any): Promise<{
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
    findOne(idOrSlug: string): Promise<{
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
    update(id: string, updateBlogDto: any): Promise<{
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
