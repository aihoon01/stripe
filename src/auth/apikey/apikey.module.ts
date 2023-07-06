import { Module } from '@nestjs/common';
import { ApikeyService } from './apikey.service';

@Module({
  providers: [ApikeyService],
  exports: [ApikeyService]
})
export class ApikeyModule {}
