import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ApikeyModule } from './apikey/apikey.module';
import { AuthController } from './auth.controller';
import {  SignInWithPassword, SignUpWithPassword } from './auth.service';
import { HashModule } from './hash/hash.module';
import { JwtStrategy } from './strategy';

@Module({
    imports: [HashModule, ApikeyModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [SignUpWithPassword, SignInWithPassword, JwtStrategy]
})
export class AuthModule {}
 