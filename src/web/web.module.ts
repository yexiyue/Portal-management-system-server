import { Module } from '@nestjs/common';
import { WebService } from './web.service';
import { WebController } from './web.controller';

@Module({
  controllers: [WebController],
  providers: [WebService]
})
export class WebModule {}
