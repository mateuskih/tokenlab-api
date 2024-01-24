import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from './event.service';
import { EventModel } from './event.model';

@Module({
  imports: [TypeOrmModule.forFeature([EventModel])],
  providers: [EventService],
  controllers: [EventController],
})
export class EventModule {}
