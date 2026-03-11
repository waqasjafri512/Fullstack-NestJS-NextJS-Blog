import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BlogsModule } from './blogs/blogs.module';
import { ImagesModule } from './images/images.module';
import { CategoriesModule } from './categories/categories.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [PrismaModule, AuthModule, BlogsModule, ImagesModule, CategoriesModule, SettingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
