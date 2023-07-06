import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApikeyService } from '../auth/apikey/apikey.service';
import { HashService } from '../auth/hash/hash.service';
import { PrismaService } from '../prisma/prisma.service';
import { userDto } from './dto';

@Injectable()
export class SignUpWithPassword {
    constructor(
        private prisma: PrismaService,
        private hashing: HashService,
        private apikey: ApikeyService
        ) {}

    async signup(dto: userDto) {
     let findEmail  =  await this.prisma.user.findUnique({
        where: {
            email: dto.email
        }
     })
     if (findEmail) throw new ForbiddenException("Email already exists")

     const hashedPassword  = await this.hashing.hashPassword(dto.password);


     const saveUser = await this.prisma.user.create({
        data: {
            email: dto.email,
            password: hashedPassword,
            apiKey: this.apikey.generateApiKey()
        }
     })

     delete saveUser.password
     return saveUser;

    };
};

@Injectable()
export class SignInWithPassword {
    constructor(
        private prisma: PrismaService,
        private hashing: HashService,
        private config: ConfigService,
        private jwt: JwtService
    ) {}

    async signin(dto:userDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if (!user) throw new ForbiddenException("Password or email is incorrect");

        const passwordCheck = await this.hashing.verify(user.password, dto.password);
        if (!passwordCheck) throw new ForbiddenException("Password or email is incorrect");

        return await this.signToken(user.id, user.password)
    };

     private async signToken(userId: string, email: string) : Promise<{access_token: string}> {
        const payload = {
            sub: userId,
            email,
        }

        const secret = this.config.get('JWT_SECRET');
        try {
        const token = await this.jwt.signAsync(payload, {
            expiresIn: "5m",
            secret,
        });

        return {
            access_token: token
        }

    } catch (error) {
        throw new Error("Something went wrong")
    }
}
}