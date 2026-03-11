import { Controller, Post, Body, UseGuards, Request, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(@Body() data: any) {
        return this.authService.register(data);
    }

    @Post('login')
    async login(@Body() data: any) {
        const user = await this.authService.validateUser(data.email, data.password);
        if (!user) {
            return { message: 'Invalid credentials' };
        }
        return this.authService.login(user);
    }

    @Patch('change-password')
    @UseGuards(JwtAuthGuard)
    changePassword(@Request() req, @Body() data: any) {
        return this.authService.changePassword(req.user.sub, data);
    }
}
