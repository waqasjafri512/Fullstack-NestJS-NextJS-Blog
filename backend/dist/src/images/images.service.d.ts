import { PrismaService } from '../prisma/prisma.service';
export declare class ImagesService {
    private prisma;
    constructor(prisma: PrismaService);
    uploadImage(file: Express.Multer.File, blogId?: string): Promise<{
        id: string;
        createdAt: Date;
        data: Uint8Array;
        filename: string;
        mimetype: string;
        blogId: string | null;
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        data: Uint8Array;
        filename: string;
        mimetype: string;
        blogId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        data: Uint8Array;
        filename: string;
        mimetype: string;
        blogId: string | null;
    }>;
}
