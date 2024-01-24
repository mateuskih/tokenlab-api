import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { EventService } from './event.service';
import { EventModel } from './event.model';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  async addEvent(
    @Body('description') description: string,
    @Body('startTime') startTime: Date,
    @Body('endTime') endTime: Date,
    @Body('userId') userId: number,
  ): Promise<EventModel> {
    return await this.eventService.addEvent(
      description,
      startTime,
      endTime,
      userId,
    );
  }

  @Get(':userId')
  async getEventsByUserId(
    @Param('userId') userId: number,
  ): Promise<EventModel[]> {
    return await this.eventService.getEventsByUserId(userId);
  }

  @Put(':eventId')
  async editEvent(
    @Param('eventId') eventId: number,
    @Body('description') description: string,
    @Body('startTime') startTime: Date,
    @Body('endTime') endTime: Date,
  ): Promise<EventModel> {
    return await this.eventService.editEvent(
      eventId,
      description,
      startTime,
      endTime,
    );
  }

  @Delete(':eventId')
  async removeEvent(@Param('eventId') eventId: number): Promise<void> {
    return await this.eventService.removeEvent(eventId);
  }
}
