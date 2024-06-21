import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { PrismaModule } from '@app/core/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    EventsModule,
  ],
})
export class Partner1Module {}