import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { SignInWithPassword, SignUpWithPassword } from './auth.service';
import { userDto } from './dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private signUpWithPassword: SignUpWithPassword,
        private signInWithPassword: SignInWithPassword ) {}

    @ApiCreatedResponse({description: 'Create a new user', type: userDto})
    @Post('signup')
    create(@Body() dto: userDto) {
        return this.signUpWithPassword.signup(dto)
    }

    @ApiCreatedResponse({description: 'Signs a user in', type: userDto})
    @Post('signin')
    login(
        @Body() dto: userDto,        
        @Res({passthrough: true}) res: Response): Promise<{ access_token: string; }> {
        const token = this.signInWithPassword.signin(dto)
        res.cookie('access_token', token)
        return token
        
    } 
};
