import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServerModule } from './server/server.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { HashModule } from './auth/hash/hash.module';
import { ApikeyModule } from './auth/apikey/apikey.module';
import { AccessModule } from './access/access.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailConfig } from './config/mail/mail.service';
import { MailModule } from './config/mail/mail.module';

@Module({
  imports: [
    ServerModule, 
    ConfigModule.forRoot({isGlobal: true}), 
    MailerModule.forRoot(mailConfig),
    PrismaModule, AuthModule, HashModule, ApikeyModule, AccessModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
