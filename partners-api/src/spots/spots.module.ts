import { Module } from '@nestjs/common';
import { SpotService } from './spots.service';
import { SpotsController } from './spots.controller';

@Module({
  controllers: [SpotsController],
  providers: [SpotService],
})
export class SpotModule {}
