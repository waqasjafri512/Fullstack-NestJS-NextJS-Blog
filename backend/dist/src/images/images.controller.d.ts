import { ImagesService } from './images.service';
import type { Response } from 'express';
export declare class ImagesController {
    private readonly imagesService;
    constructor(imagesService: ImagesService);
    uploadFile(file: Express.Multer.File): Promise<{
        id: string;
        url: string;
    }>;
    getImage(id: string, res: Response): Promise<void>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        data: Uint8Array;
        filename: string;
        mimetype: string;
        blogId: string | null;
    }>;
}
