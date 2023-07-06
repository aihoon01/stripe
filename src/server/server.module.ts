import { Module } from '@nestjs/common';
import {  CreateStripeSession, ServerService } from './server.service';
import { ServerController } from './server.controller';
import { ApikeyModule } from '../auth/apikey/apikey.module';
// import { CreateStripeSession } from './create-stripe-session.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [ServerService, CreateStripeSession],
  controllers: [ServerController],
  imports: [ApikeyModule]
})
export class ServerModule {}
