import { Injectable } from '@nestjs/common';
import { generateApiKey } from 'generate-api-key';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ApikeyService {
    constructor(private prisma: PrismaService) {}

    generateApiKey() : string {
        return  generateApiKey({method: 'uuidv4', prefix: 'pkay'}).toString()
    }

    async verifyApiKey(key:string) {
        const userKey = await this.prisma.user.findUnique({
            where: {
                apiKey: key
            }
        })

        return userKey.apiKey
    } 
}
 