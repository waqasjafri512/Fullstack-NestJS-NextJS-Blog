import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImagesService {
    constructor(private prisma: PrismaService) { }

    async uploadImage(file: Express.Multer.File, blogId?: string) {
        return this.prisma.image.create({
            data: {
                filename: file.originalname,
                mimetype: file.mimetype,
                data: file.buffer,
                blogId: blogId || null,
            },
        });
    }

    async findOne(id: string) {
        const image = await this.prisma.image.findUnique({ where: { id } });
        if (!image) throw new NotFoundException('Image not found');
        return image;
    }

    async remove(id: string) {
        return this.prisma.image.delete({ where: { id } });
    }
}
