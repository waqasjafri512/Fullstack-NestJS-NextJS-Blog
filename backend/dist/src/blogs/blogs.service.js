"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BlogsService = class BlogsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, authorId) {
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
    async findOne(id) {
        const blog = await this.prisma.blog.findUnique({
            where: { id },
            include: { category: true, tags: true, author: true },
        });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return blog;
    }
    async findBySlug(slug) {
        const blog = await this.prisma.blog.findUnique({
            where: { slug },
            include: { category: true, tags: true, author: true },
        });
        if (!blog)
            throw new common_1.NotFoundException('Blog not found');
        return blog;
    }
    async update(id, data) {
        const { isPublished, ...rest } = data;
        const updateData = { ...rest };
        if (isPublished !== undefined) {
            updateData.published = isPublished;
        }
        return this.prisma.blog.update({
            where: { id },
            data: updateData,
        });
    }
    async remove(id) {
        return this.prisma.blog.delete({ where: { id } });
    }
};
exports.BlogsService = BlogsService;
exports.BlogsService = BlogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BlogsService);
//# sourceMappingURL=blogs.service.js.map