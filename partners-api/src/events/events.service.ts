import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReserveSpotDto } from './dto/reserve-spot.dto';
import { TicketStatus, SpotStatus, Prisma} from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private prismaService: PrismaService) {}

  create(createEventDto: CreateEventDto) {
    return this.prismaService.event.create({
      data: {
        ...createEventDto,
        date: new Date(createEventDto.date),
      },
    });
  }

  findAll() {
    return this.prismaService.event.findMany();
  }

  findOne(id: string) {
    return this.prismaService.event.findUnique({
      where: { id },
    });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.prismaService.event.update({
      data: {
        ...updateEventDto,
        date: new Date(updateEventDto.date),
      },
      where: { id },
    });
  }

  remove(id: string) {
    return this.prismaService.event.delete({
      where: { id },
    });
  }
  //Consultando se tem lugares
  async reserveSpot(dto: ReserveSpotDto & { eventId: string }) {
    const spots = await this.prismaService.spot.findMany({
      where: {
        eventId: dto.eventId,
        name: {
          in: dto.spots,
        },
      },
    });

    if (spots.length !== dto.spots.length) {
      const foundSpotsName = spots.map((spot) => spot.name);
      const notFoundSpotsName = dto.spots.filter(
        (spot) => !foundSpotsName.includes(spot),
      );

      throw new Error(`Spots ${notFoundSpotsName.join(', ')} not found`);
    }

    try {
      const tickets = this.prismaService.$transaction(async (prisma) => {
        //Criando reserva
         await prisma.reservationHistory.createMany({
            data: spots.map((spot) => ({
              spotId: spot.id,
              email: dto.email,
              ticketKind: dto.ticket_kind,
              status: TicketStatus.RESERVED,
            })),
          })
      
          await prisma.spot.updateMany({
            where: {
              id: {
                in: spots.map((spot) => spot.id),
              },
            },
            data: {
              status: SpotStatus.RESERVED,
            },
          });
      
          const tickets = await Promise.all(
            spots.map((spot) =>
              this.prismaService.ticket.create({
                data: {
                  spotId: spot.id,
                  ticketKind: dto.ticket_kind,
                  email: dto.email,
                },
              })
            )
          )
      })      
      return tickets;      
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2002':
            case 'P2034':
              throw new Error('Some of the spots are already reserved');
        }
      }
    }
  }  
}
