import { Module } from '@nestjs/common';
import { EventosModule } from './eventos/eventos.module';
import { PrismaModule } from '@app/core/prisma/prisma.module';
import { LugaresModule } from './lugares/lugares.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.partner1'}),   
    PrismaModule,
    EventosModule,
    LugaresModule,
  ],
})
export class Partner2Module {}