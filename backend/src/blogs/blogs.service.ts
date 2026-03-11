import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogsService {
    constructor(private prisma: PrismaService) { }

    async create(data: any, authorId: string) {
        const { isPublished, ...rest } = data;
        return this.prisma.blog.create({
            data: {
                ...rest,
                published: isPublished ?? false,
                authorId: authorId,
                slug: data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
            },
        });
    }

    async findAll() {
        return this.prisma.blog.findMany({
            include: { category: true, tags: true, author: true },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        const blog = await this.prisma.blog.findUnique({
            where: { id },
            include: { category: true, tags: true, author: true },
        });
        if (!blog) throw new NotFoundException('Blog not found');
        return blog;
    }

    async findBySlug(slug: string) {
        const blog = await this.prisma.blog.findUnique({
            where: { slug },
            include: { category: true, tags: true, author: true },
        });
        if (!blog) throw new NotFoundException('Blog not found');
        return blog;
    }

    async update(id: string, data: any) {
        const { isPublished, ...rest } = data;
        const updateData: any = { ...rest };
        if (isPublished !== undefined) {
            updateData.published = isPublished;
        }
        return this.prisma.blog.update({
            where: { id },
            data: updateData,
        });
    }

    async remove(id: string) {
        return this.prisma.blog.delete({ where: { id } });
    }
}
