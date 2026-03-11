import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('blogs')
export class BlogsController {
    constructor(private readonly blogsService: BlogsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createBlogDto: any, @Request() req) {
        return this.blogsService.create(createBlogDto, req.user.userId);
    }

    @Get()
    findAll() {
        return this.blogsService.findAll();
    }

    @Get(':idOrSlug')
    findOne(@Param('idOrSlug') idOrSlug: string) {
        // UUID v4 format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (uuidRegex.test(idOrSlug)) {
            return this.blogsService.findOne(idOrSlug);
        }
        return this.blogsService.findBySlug(idOrSlug);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBlogDto: any) {
        return this.blogsService.update(id, updateBlogDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.blogsService.remove(id);
    }
}
