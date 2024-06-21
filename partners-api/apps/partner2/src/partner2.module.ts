import { Module } from '@nestjs/common';
import { EventosModule } from './eventos/eventos.module';
import { PrismaModule } from '@app/core/prisma/prisma.module';
import { LugaresModule } from './lugares/lugares.module';

@Module({
  imports: [   
    PrismaModule,
    EventosModule,
    LugaresModule,
  ],
})
export class Partner2Module {}