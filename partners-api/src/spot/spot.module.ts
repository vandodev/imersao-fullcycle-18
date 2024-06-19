import { Module } from '@nestjs/common';
import { SpotService } from './spot.service';
import { SpotController } from './spot.controller';

@Module({
  controllers: [SpotController],
  providers: [SpotService],
})
export class SpotModule {}
