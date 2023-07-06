import { Module } from '@nestjs/common';
import { AccessController } from './access.controller';
import { AccessService } from './access.service';
import { MailingService } from 'src/config/mail/mail.service';

@Module({
  controllers: [AccessController],
  providers: [AccessService, MailingService]
})
export class AccessModule {}
