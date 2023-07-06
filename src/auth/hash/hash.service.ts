import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class HashService {
    constructor(private config: ConfigService, private prisma: PrismaService) {}
    
    async hashPassword(password: string) {
        return await argon.hash(password)
    } 

    async verify(hash:string, password: string) {
        return await argon.verify(hash, password)
    }
}
