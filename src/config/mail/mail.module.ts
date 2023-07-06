import { Global, Module } from '@nestjs/common';
import { MailingService } from './mail.service';

@Global()
@Module({
    providers: [MailingService]
})
export class MailModule {}