import { Controller, Post, Get, Param, Delete, UseInterceptors, UploadedFile, Res, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';
import type { Response } from 'express';

@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const image = await this.imagesService.uploadImage(file);
        return {
            id: image.id,
            url: `/images/${image.id}`, // Virtual URL for frontend
        };
    }

    @Get(':id')
    async getImage(@Param('id') id: string, @Res() res: Response) {
        const image = await this.imagesService.findOne(id);
        res.setHeader('Content-Type', image.mimetype);
        res.send(image.data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.imagesService.remove(id);
    }
}
